# Guía Completa: Google Analytics, Google Ads y SEO

## 📊 PASO 1: Google Analytics 4 (GA4)

### 1.1 Crear cuenta de Google Analytics
1. Ve a: https://analytics.google.com/
2. Inicia sesión con tu cuenta de Google
3. Click en **"Comenzar a medir"**
4. Crea una **Propiedad**:
   - Nombre: "Clandestina SPA"
   - Zona horaria: (GMT-05:00) Bogotá
   - Moneda: COP (Peso colombiano)
5. Completa la información del negocio
6. Acepta los términos

### 1.2 Obtener el ID de medición
1. En tu propiedad de GA4, ve a **Administrar** (⚙️) → **Flujos de datos**
2. Click en **"Agregar flujo"** → **"Web"**
3. URL del sitio web: `https://tu-dominio.com`
4. Nombre del flujo: "Sitio web principal"
5. Click en **"Crear flujo"**
6. **Copia el ID de medición** (formato: G-XXXXXXXXXX)

### 1.3 Instalar el código en tu sitio
- **Ya está preparado en el código**, solo necesitas:
  1. Abrir `index.html` y buscar `<!-- Google Analytics -->`
  2. Reemplazar `G-XXXXXXXXXX` con tu ID real
  3. Repetir en todas las páginas HTML (modelo-*.html, agencia.html, etc.)

---

## 🎯 PASO 2: Google Ads

### 2.1 Crear cuenta de Google Ads
1. Ve a: https://ads.google.com/
2. Inicia sesión con tu cuenta de Google
3. Click en **"Comenzar ahora"**
4. Selecciona tu objetivo:
   - **"Obtener más llamadas"** o
   - **"Obtener más visitas a tu sitio web"**
5. Completa la información:
   - Nombre del negocio: "Clandestina SPA"
   - Sitio web: `https://tu-dominio.com`
   - Ubicación: Ibagué, Tolima, Colombia

### 2.2 Configurar la primera campaña
1. **Tipo de campaña**: Búsqueda (Search)
2. **Objetivo**: Tráfico al sitio web
3. **Configuración básica**:
   - Nombre: "Campaña Principal - Ibagué"
   - Tipo de búsqueda: "Búsqueda estándar"
   - Redes: Solo Google Search
4. **Audiencia y ubicaciones**:
   - Ubicaciones: Ibagué, Tolima, Colombia
   - Radio: 20-30 km (ajustable)
5. **Presupuesto**:
   - Presupuesto diario: Empieza con $50,000 - $100,000 COP/día
   - Puja: Manual CPC (Costo por clic)
6. **Palabras clave sugeridas**:
   ```
   modelos VIP Ibagué
   acompañantes Ibagué
   escorts de lujo Ibagué
   modelos profesionales Ibagué
   agencia modelos Ibagué
   servicios prepagos Ibagué
   ```

### 2.3 Instalar Google Ads Conversion Tracking
1. En Google Ads, ve a **Herramientas y configuración** → **Conversiones**
2. Click en **"+"** para crear nueva acción
3. Tipo: **"Sitio web"**
4. Categoría: **"Llamada telefónica"** o **"Envío de formulario"**
5. **Copia el código de seguimiento** (Global Site Tag)
6. **Ya está preparado en el código**, solo reemplaza el ID

---

## 🔍 PASO 3: Google Search Console (SEO)

### 3.1 Verificar propiedad en Search Console
1. Ve a: https://search.google.com/search-console
2. Click en **"Agregar propiedad"**
3. Selecciona **"Prefijo de URL"**
4. Ingresa: `https://tu-dominio.com`
5. Método de verificación: **"Etiqueta HTML"**
6. **Copia el código de verificación**

### 3.2 Agregar código de verificación
- **Ya está preparado en el código**, solo necesitas:
  1. Abrir `index.html`
  2. Buscar `<!-- Google Search Console Verification -->`
  3. Reemplazar `content="TU_CODIGO_AQUI"` con tu código real

### 3.3 Enviar Sitemap
1. En Search Console, ve a **Sitemaps**
2. Ingresa: `sitemap.xml`
3. Click en **"Enviar"**
4. Espera 1-2 días para que Google lo procese

### 3.4 Solicitar indexación
1. En Search Console, ve a **Inspección de URL**
2. Ingresa tu URL principal: `https://tu-dominio.com`
3. Click en **"Solicitar indexación"**
4. Repite para páginas importantes:
   - `/agencia.html`
   - `/modelo-camila.html`
   - etc.

---

## 📝 PASO 4: Actualizar URLs en el código

### 4.1 Actualizar dominio en meta tags
Necesitas reemplazar `https://clandestinaspa.com` con tu dominio real en:
- `index.html`
- `agencia.html`
- `modelo-camila.html`
- `modelo-maria.html`
- `modelo-ana.html`
- `modelo-vanesa.html`
- `modelo-sofia.html`
- `modelo-angie.html`
- `modelo-catalina.html`
- `modelo-valentina.html`
- `sitemap.xml`

### 4.2 Archivos a actualizar
Busca y reemplaza en todos los archivos HTML:
- `og:url`
- `twitter:url`
- `canonical`
- `url` en Schema.org JSON-LD

---

## ✅ CHECKLIST FINAL

### Google Analytics
- [ ] Cuenta creada
- [ ] ID de medición obtenido (G-XXXXXXXXXX)
- [ ] Código agregado en todas las páginas HTML
- [ ] Verificar que funciona: Abre tu sitio y revisa en GA4 → Tiempo real

### Google Ads
- [ ] Cuenta creada
- [ ] Primera campaña configurada
- [ ] Palabras clave agregadas
- [ ] Presupuesto configurado
- [ ] Código de conversión agregado (opcional)

### Google Search Console
- [ ] Propiedad verificada
- [ ] Código de verificación agregado
- [ ] Sitemap enviado
- [ ] URLs principales solicitadas para indexación

### SEO
- [ ] URLs actualizadas en todos los meta tags
- [ ] Sitemap.xml actualizado con dominio real
- [ ] Robots.txt verificado

---

## 🚀 PRÓXIMOS PASOS DESPUÉS DE CONFIGURAR

1. **Esperar 24-48 horas** para que Google indexe tu sitio
2. **Monitorear en Search Console**:
   - Revisar errores de rastreo
   - Ver qué páginas están indexadas
   - Revisar palabras clave que te encuentran
3. **Optimizar campañas de Google Ads**:
   - Revisar qué palabras clave funcionan
   - Ajustar pujas según rendimiento
   - Agregar palabras clave negativas
4. **Analizar en Google Analytics**:
   - Ver de dónde vienen tus visitantes
   - Qué páginas son más populares
   - Tiempo en el sitio
   - Tasa de rebote

---

## 📞 SOPORTE

Si tienes problemas:
- Google Analytics Help: https://support.google.com/analytics
- Google Ads Help: https://support.google.com/google-ads
- Search Console Help: https://support.google.com/webmasters

---

**IMPORTANTE**: Recuerda actualizar todas las URLs con tu dominio real antes de verificar en Search Console.

