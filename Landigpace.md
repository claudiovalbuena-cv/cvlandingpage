Project Architecture Plan: Photography Events Landing Page & Booking System
Este documento define la arquitectura técnica, estructural y visual para la creación de una landing page de alta gama para servicios de fotografía.

1. Stack Tecnológico Sugerido
Frontend: Next.js 14+ (App Router) para SEO optimizado.

Styling: Tailwind CSS (Estilo Minimalista/Elegante).

Componentes UI: Shadcn/UI (Moderno y funcional).

Backend/Base de Datos: Supabase (Auth, DB para precios y almacenamiento del logo).

Calendario/Reservas: React Day Picker + Lucide Icons.

Despliegue: Vercel o Netlify (Optimizado para Next.js).

2. Estructura de Archivos y Carpetas
/
├── public/
│   ├── assets/          # Imágenes de muestra y placeholders
│   └── logo.png         # Logo dinámico
├── src/
│   ├── app/             # Rutas y páginas (Next.js App Router)
│   │   ├── admin/       # Panel de gestión (Precios y Logo)
│   │   ├── api/         # Endpoints para reservas y correos
│   │   └── layout.tsx   # Layout global
│   ├── components/      # Componentes modulares
│   │   ├── sections/    # Hero, Pricing, Portfolio, Contact
│   │   ├── ui/          # Botones, Inputs, Calendarios (Shadcn)
│   │   └── shared/      # Navbar, Footer
│   ├── hooks/           # Lógica de fetching de datos
│   ├── lib/             # Configuración de Supabase/Utils
│   └── types/           # Definiciones de TypeScript
├── tailwind.config.ts   # Configuración de colores (White, Light Gray, Black)
└── next.config.js

3. Especificaciones de Diseño (UI/UX)
Paleta de Colores: * Primary: #FFFFFF (Blanco Puro)

Secondary: #F5F5F5 (Gris Claro)

Accent/Text: #000000 (Negro Elegante)

Tipografía: Serif para títulos (estilo editorial) y Sans-serif para cuerpo (minimalista).

Estética: Espacios en blanco amplios, transiciones suaves (framer-motion), imágenes a pantalla completa con bordes sutiles.

4. Funcionalidades del Sistema
A. Landing Page (Front)
Hero Section: Imagen de alto impacto + Logo centrado.

Pricing Table: Cuatro categorías (Bodas, 15 Años, Eventos, Bautizos). Los datos se consumen desde la base de datos.

Booking System: Formulario con:

Selector de fecha (Calendario dinámico).

Validación de disponibilidad.

Envío de confirmación vía Email.

Social Integration: Sticky icons de Instagram, WhatsApp y links externos configurables.

B. Panel de Administración (CMS Privado)
Autenticación: Login seguro mediante Supabase Auth.

Gestión de Contenido: * Update de precios en tiempo real.

Carga de nuevo Logo (Sustitución de archivo en storage).

Gestión de enlaces externos.

5. Modelo de Datos (Base de Datos)

table services {
  id: uuid
  name: string (Bodas, 15 Años, etc)
  price: decimal
  description: text
  image_url: string
}

table bookings {
  id: uuid
  client_name: string
  event_type: string
  event_date: date
  email: string
  status: string
}

table settings {
  key: string (logo_url, website_link, social_ig)
  value: string
}

6. Instrucciones de Generación para el IDE
Setup Inicial: Instalar Next.js, Tailwind CSS y Shadcn/UI.

Configuración de Colores: Extender el tema de Tailwind para usar la paleta Blanco/Gris/Negro.

Componentización: Crear componentes de "Precio" que reciban props para facilitar el mantenimiento.

Integración de Formulario: Usar react-hook-form con zod para validar los datos del calendario antes de enviarlos al backend.

Optimización de Imágenes: Utilizar next/image para asegurar que las fotos de fotografía carguen rápido sin perder calidad.

Para implementar el formulario de reserva con calendario siguiendo la estética minimalista (Blanco, Gris y Negro) y utilizando las tecnologías modernas mencionadas en el plan anterior, utilizaremos React Day Picker (popularizado por Shadcn/UI), Tailwind CSS y Lucide React.

Este componente está diseñado para ser funcional y visualmente elegante.

1. Instalación de Dependencias
Si estás en el entorno de desarrollo, asegúrate de tener estas librerías:

npm install react-day-picker date-fns lucide-react

2. Código del Componente de Reserva (BookingForm.tsx)

import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { Calendar as CalendarIcon, Clock, User, Mail, Camera, ChevronRight } from 'lucide-react';
import 'react-day-picker/dist/style.css';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const eventTypes = ["Boda", "15 Años", "Evento Social", "Bautizo"];

  // Estilos personalizados para el calendario (Minimalista Blanco/Negro)
  const calendarStyles = `
    .rdp-day_selected { 
      background-color: black !important; 
      color: white !important; 
      border-radius: 0px;
    }
    .rdp-button:hover:not(.rdp-day_selected) { 
      background-color: #f5f5f5; 
    }
  `;

  return (
    <section className="bg-white py-20 px-6 max-w-5xl mx-auto" id="reservas">
      <style>{calendarStyles}</style>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Lado Izquierdo: Texto y Estética */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 uppercase tracking-widest text-black">
            Reserva <br /> tu fecha
          </h2>
          <p className="text-gray-500 font-light leading-relaxed mb-8">
            Cada momento es único. Asegura la cobertura profesional para tu evento. 
            Selecciona una fecha en el calendario y completa tus datos.
          </p>
          <div className="space-y-4 text-sm tracking-wide uppercase">
            <div className="flex items-center gap-3 text-black">
              <Clock size={18} strokeWidth={1} />
              <span>Respuesta en menos de 24 horas</span>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="bg-[#F5F5F5] p-8 md:p-10 shadow-sm">
          <form className="space-y-6">
            
            {/* Selector de Evento */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Tipo de Evento</label>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black appearance-none transition-colors">
                  {eventTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>{type}</option>
                  ))}
                </select>
                <Camera className="absolute right-2 top-3 text-gray-400" size={16} />
              </div>
            </div>

            {/* Datos Personales */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Nombre Completo</label>
                <input type="text" className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" placeholder="Ej. Ana García" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors" placeholder="contacto@ejemplo.com" />
              </div>
            </div>

            {/* Calendario Integrado */}
            <div className="pt-4">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">Selecciona la fecha del evento</label>
              <div className="flex justify-center bg-white p-4 border border-gray-100 shadow-sm">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={es}
                  showOutsideDays
                  className="mx-auto"
                />
              </div>
              {selectedDate && (
                <p className="mt-4 text-xs text-center text-gray-500 italic">
                  Fecha seleccionada: {format(selectedDate, "PPP", { locale: es })}
                </p>
              )}
            </div>

            {/* Botón de Envío */}
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 mt-6 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all uppercase text-xs tracking-[0.3em]"
            >
              Solicitar Disponibilidad
              <ChevronRight size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default BookingForm;

Puntos clave de este diseño:
Estética High-End: Utiliza una combinación de tipografía con mucho espaciado (tracking) y bordes inferiores finos en lugar de cajas cerradas para los inputs.

Calendario Nativo: El DayPicker está configurado para ser minimalista. He añadido un bloque de CSS (calendarStyles) para que el día seleccionado sea un cuadrado negro sólido, eliminando los redondeados comunes para mantener el estilo "vanguardista".

Adaptabilidad: Es totalmente responsive (1 columna en móvil, 2 columnas en escritorio).

UX: Muestra la fecha seleccionada en formato humano (ej: "21 de enero de 2026") justo debajo del calendario para confirmar la elección del usuario.

1. Conexión del Formulario a Correo (Servicio Resend)
Utilizaremos Resend porque es el estándar actual para desarrolladores, con una capa gratuita excelente.

Instalación: npm install resend

Archivo: src/app/api/send/route.ts

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, eventType, date } = await request.json();

    const data = await resend.emails.send({
      from: 'Fotografía Premium <onboarding@resend.dev>', // Configura tu dominio aquí
      to: ['tu-correo@empresa.com'], // Donde recibirás las notificaciones
      subject: `Nueva Reserva: ${eventType} - ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Nueva Solicitud de Reserva</h2>
          <p><strong>Cliente:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Evento:</strong> ${eventType}</p>
          <p><strong>Fecha Seleccionada:</strong> ${date}</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }

  2. Gestión de Precios Dinámica (Panel Administrativo)
Para que la empresa pueda modificar precios sin tocar el código, creamos un hook que consulte a Supabase (Base de datos).
}
Archivo: src/hooks/usePrices.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Configuración de cliente Supabase

export function usePrices() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    // 1. Cargar precios iniciales
    const fetchPrices = async () => {
      const { data } = await supabase.from('services').select('*').order('id');
      if (data) setPrices(data);
    };

    fetchPrices();

    // 2. Escuchar cambios en tiempo real (Realtime)
    const subscription = supabase
      .channel('prices_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'services' }, 
        (payload) => {
          setPrices(current => 
            current.map(p => p.id === payload.new.id ? payload.new : p)
          );
        })
      .subscribe();

    return () => { supabase.removeChannel(subscription); };
  }, []);

  return { prices };
}

3. Componente de Precios "Vanguardista"
Este componente consume los datos anteriores y refleja los cambios al instante.

Archivo: src/components/sections/Pricing.tsx

import { usePrices } from '@/hooks/usePrices';

const Pricing = () => {
  const { prices } = usePrices();

  return (
    <section className="bg-[#F5F5F5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.5em] text-center mb-16 text-gray-500">Inversión y Cobertura</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {prices.map((item: any) => (
            <div key={item.id} className="bg-white p-10 flex flex-col items-center group hover:bg-black transition-colors duration-500">
              <h3 className="text-black group-hover:text-white font-serif text-2xl mb-4">{item.name}</h3>
              <div className="h-[1px] w-10 bg-gray-200 mb-6 group-hover:bg-zinc-700"></div>
              <p className="text-black group-hover:text-white text-3xl font-light mb-8">
                ${item.price}
              </p>
              <ul className="text-[11px] uppercase tracking-widest text-gray-400 space-y-3 mb-10 text-center">
                {item.features.map((f: string) => <li key={f}>{f}</li>)}
              </ul>
              <button className="border border-black group-hover:border-white px-6 py-2 text-[10px] uppercase tracking-widest group-hover:text-white transition-all">
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

4. Instrucciones para el IDE (Integración Final)
Para que el IDE cree el panel administrativo correctamente, añade esto a tu archivo .MD:

Dashboard Route: Crea una ruta /admin protegida por middleware.ts.

Formulario de Edición: Un formulario simple que use supabase.from('services').update({ price: newPrice }).eq('id', id).

Gestión de Logo: Usa Supabase Storage. El componente Navbar debe pedir la URL del logo desde la tabla settings para que, si la empresa sube un nuevo logo, este cambie automáticamente en toda la web sin redesplegar.

Interfaz tipo "Control Center" minimalista que sigue la estética del proyecto.

1. Panel de Administración (src/app/admin/page.tsx)
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, Link as LinkIcon, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generalSettings, setGeneralSettings] = useState({ website_link: '' });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: svc } = await supabase.from('services').select('*').order('id');
    const { data: set } = await supabase.from('settings').select('*');
    
    if (svc) setServices(svc);
    if (set) {
      const link = set.find(s => s.key === 'website_link')?.value;
      setGeneralSettings({ website_link: link || '' });
    }
    setLoading(false);
  }

  async function updatePrice(id: string, newPrice: number) {
    await supabase.from('services').update({ price: newPrice }).eq('id', id);
  }

  async function updateSettings() {
    await supabase.from('settings').update({ value: generalSettings.website_link }).eq('key', 'website_link');
    alert("Configuración actualizada");
  }

  if (loading) return <div className="h-screen flex items-center justify-center font-serif uppercase tracking-widest">Cargando Sistema...</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Panel de Control</h1>
            <p className="text-3xl font-serif">Gestión de Contenido</p>
          </div>
          <button onClick={fetchData} className="p-2 hover:rotate-180 transition-transform duration-500">
            <RefreshCw size={20} strokeWidth={1} />
          </button>
        </header>

        <div className="grid gap-8">
          {/* SECCIÓN DE PRECIOS */}
          <section className="bg-white p-8 shadow-sm">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <DollarSign size={14} /> Precios de Cobertura
            </h2>
            <div className="space-y-6">
              {services.map((service: any) => (
                <div key={service.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="font-medium text-sm">{service.name}</span>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      defaultValue={service.price}
                      className="w-24 border-b border-gray-300 text-right focus:border-black outline-none transition-colors px-2"
                      onBlur={(e) => updatePrice(service.id, Number(e.target.value))}
                    />
                    <span className="text-xs text-gray-400">USD</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN DE ENLACES EXTERNOS */}
          <section className="bg-white p-8 shadow-sm">
            <h2 className="text-[10px] uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <LinkIcon size={14} /> Enlaces y Web
            </h2>
            <div className="flex flex-col gap-4">
              <label className="text-xs">URL Sitio Web / Portafolio Extendido</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={generalSettings.website_link}
                  onChange={(e) => setGeneralSettings({ website_link: e.target.value })}
                  className="flex-1 bg-[#F9F9F9] border-none p-3 text-sm focus:ring-1 ring-black outline-none"
                  placeholder="https://tu-sitio.com"
                />
                <button 
                  onClick={updateSettings}
                  className="bg-black text-white px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                >
                  <Save size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

2. Esquema de Base de Datos Sugerido (SQL)
Para que el IDE cree las tablas necesarias en tu base de datos, ejecuta este script en el editor de SQL:

-- Tabla para los servicios y precios
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL,
  features TEXT[] -- Array de características (ej: ['100 fotos', 'Entrega digital'])
);

-- Tabla para configuraciones generales
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Insertar datos iniciales
INSERT INTO services (name, price, features) VALUES
('Boda', 1200, ARRAY['Cobertura 8h', 'Sesión Pre-boda', 'Galería Online']),
('15 Años', 800, ARRAY['Cobertura 6h', 'Photobook', 'Video Highlight']),
('Eventos', 450, ARRAY['Precio por Hora', 'Edición Express', 'Todas las fotos']),
('Bautizo', 350, ARRAY['Cobertura Iglesia', 'Sesión Familiar', '20 Fotos impresas']);

INSERT INTO settings (key, value) VALUES ('website_link', 'https://tuportafolio.com');

Resumen del Flujo de Trabajo
Frontend: La Landing consume services y settings para mostrar precios y links.

Dashboard: La empresa entra a /admin, cambia un número y el cambio es instantáneo en la web gracias al hook de tiempo real que creamos antes.

Reserva: El formulario de calendario envía un JSON al API Route, que a su vez dispara un email elegante mediante Resend.

Componente del Footer (src/components/shared/Footer.tsx)

import React from 'react';
import { Instagram, Facebook, Globe, ArrowUpRight, Mail } from 'lucide-react';
import { usePrices } from '@/hooks/usePrices'; // Reutilizamos el hook para traer settings

const Footer = () => {
  // En un entorno real, puedes crear un hook específico 'useSettings' 
  // similar al de precios para obtener el link dinámico.
  const websiteLink = "https://tuportafolio.com"; // Este valor vendría de la DB (table settings)

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          
          {/* Identidad y Logo */}
          <div className="flex flex-col space-y-6">
            <img 
              src="/logo.png" 
              alt="Logo Empresa" 
              className="h-12 w-auto object-contain self-start filter grayscale" 
            />
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 leading-relaxed">
              Capturando la esencia de tus <br /> momentos más significativos.
            </p>
          </div>

          {/* Enlaces Dinámicos */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-black font-bold mb-2">Explorar</h4>
            <a 
              href={websiteLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black transition-colors flex items-center gap-1 group"
            >
              Sitio Web Principal
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="#precios" className="text-sm text-gray-600 hover:text-black transition-colors">Tarifas de Cobertura</a>
            <a href="#reservas" className="text-sm text-gray-600 hover:text-black transition-colors">Calendario de Reservas</a>
          </div>

          {/* Redes Sociales e Integración */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-black font-bold mb-2">Conectar</h4>
            <div className="flex gap-6">
              <a href="https://instagram.com" className="text-gray-400 hover:text-black transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-black transition-colors">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="mailto:contacto@empresa.com" className="text-gray-400 hover:text-black transition-colors">
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
            <p className="text-[11px] text-gray-400 mt-4">Maracaibo, Venezuela</p>
          </div>

        </div>

        {/* Barra Inferior Final */}
        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] uppercase tracking-widest text-gray-300">
            © 2026 Fotografía Premium. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-[9px] uppercase tracking-widest text-gray-300">
            <a href="#" className="hover:text-black transition-colors">Privacidad</a>
            <a href="#" className="hover:text-black transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

Resumen Técnico para el IDE (Archivo .MD Final)
Añade este bloque final a tu documento de arquitectura para que el IDE sepa cómo ensamblar todo:

Integración de Datos: El Footer y la Navbar deben llamar a la tabla settings de Supabase para renderizar el logo_url y el website_link.

Interactividad: Implementar un Scroll Suave (Smooth Scroll) para que al hacer clic en "Tarifas" en el footer, la página se deslice elegantemente hacia la sección de precios.

Estado de Carga: Si el logo está cargando desde la base de datos, mostrar un skeleton gris claro para mantener la estética minimalista.

Este es el archivo src/app/layout.tsx y el page.tsx principal. Estos archivos actúan como el "pegamento" que une todos los componentes que hemos creado (Navbar, Hero, Precios, Formulario y Footer) en una sola aplicación funcional y elegante.

1. El Layout Global (src/app/layout.tsx)
Este archivo define la estructura que rodea a toda la página (fuentes, metadatos y el contenedor principal).

import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

// Fuente para cuerpo (Moderna/Minimalista)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Fuente para títulos (Elegante/Vanguardista)
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Fotografía Premium | Cobertura de Eventos",
  description: "Capturamos tus momentos más especiales: Bodas, 15 Años y Bautizos con un estilo minimalista y moderno.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-black antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

3. El componente Hero (src/components/sections/Hero.tsx)

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Imagen de fondo con overlay oscuro para elegancia */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" 
          alt="Wedding Photography" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-10 text-center px-4">
        <span className="text-white text-[10px] uppercase tracking-[0.8em] mb-6 block animate-fade-in">
          Estudio Fotográfico Profesional
        </span>
        <h1 className="text-white font-serif text-5xl md:text-8xl mb-8 tracking-tighter">
          Momentos <br /> <span className="italic px-4">Inmortales</span>
        </h1>
        <div className="flex justify-center gap-8">
          <a href="#reservas" className="bg-white text-black px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all">
            Reservar Fecha
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2">
        <span className="text-[8px] uppercase tracking-widest opacity-50">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="w-full h-full bg-white animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

Resumen Final para tu IDE Google Antigravity
Con estos archivos, has definido:

Frontend: Una landing page estética con fuentes elegantes (Playfair Display) y minimalistas (Inter).

Interactividad: Un sistema de scroll suave entre secciones.

Backend: Conexión directa a Supabase para cargar servicios y precios.

Reserva: Un flujo que va desde la selección en el calendario hasta el envío de email.