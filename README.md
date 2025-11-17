# Página Web Profesional para Modelos

Página web estática, minimalista y profesional diseñada para modelos. Incluye secciones de información, galería de imágenes, descarga de portafolio y redirección a WhatsApp.

## 🎨 Características

- **Diseño minimalista** con rosa fosforescente (#FF1493) y fondo blanco
- **Totalmente responsive** - se adapta a móviles, tablets y escritorio
- **Navegación suave** entre secciones
- **Galería interactiva** con modal para ver imágenes en grande
- **Integración con WhatsApp** para contacto directo
- **Optimizado para SEO** y rendimiento

## 📁 Estructura de Archivos

```
clandestina_spa/
│
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
│
└── portafolio.pdf      # Documento PDF (debes agregarlo)
```

## 🚀 Cómo Subir a Hostinger

### Opción 1: Subir por FTP (Recomendado)

1. **Conecta por FTP:**
   - Usa un cliente FTP como FileZilla, WinSCP o Cyberduck
   - Datos de conexión (los encuentras en el panel de Hostinger):
     - **Host/Servidor:** `ftp.tudominio.com` o la IP del servidor
     - **Usuario:** Tu usuario FTP
     - **Contraseña:** Tu contraseña FTP
     - **Puerto:** 21 (FTP) o 22 (SFTP)

2. **Sube los archivos:**
   - Conéctate al servidor
   - Navega a la carpeta `public_html` (o `htdocs` según tu hosting)
   - Sube todos los archivos: `index.html`, `styles.css`, `script.js`
   - Si tienes imágenes, crea una carpeta `images/` y súbelas ahí
   - Si tienes el PDF del portafolio, súbelo también

3. **Verifica:**
   - Visita `https://tudominio.com` en tu navegador
   - La página debería cargar correctamente

### Opción 2: Subir por File Manager (Panel de Hostinger)

1. **Accede al panel:**
   - Inicia sesión en tu cuenta de Hostinger
   - Ve a "Administrador de Archivos" o "File Manager"

2. **Navega a la carpeta correcta:**
   - Entra a la carpeta `public_html`

3. **Sube los archivos:**
   - Haz clic en "Subir" o "Upload"
   - Selecciona todos los archivos: `index.html`, `styles.css`, `script.js`
   - Espera a que termine la carga

4. **Organiza las imágenes:**
   - Crea una carpeta llamada `images` dentro de `public_html`
   - Sube todas tus imágenes profesionales ahí

5. **Sube el PDF:**
   - Sube el archivo `portafolio.pdf` directamente en `public_html`

## ⚙️ Personalización

### 1. Cambiar el número de WhatsApp

Edita el archivo `script.js` y busca la línea:

```javascript
const phoneNumber = '1234567890'; // CAMBIAR ESTE NÚMERO
```

Reemplaza `'1234567890'` con tu número real en formato internacional (sin espacios ni símbolos):
- Ejemplo México: `521234567890`
- Ejemplo España: `34612345678`
- Ejemplo Argentina: `5491123456789`

### 2. Agregar tus imágenes

1. Reemplaza las imágenes placeholder en `index.html`:
   - Busca las líneas con `https://via.placeholder.com/...`
   - Reemplázalas con rutas a tus imágenes reales:
     ```html
     <img src="images/foto1.jpg" alt="Descripción">
     ```

2. Para la foto "Sobre Mí":
   - Busca la línea con `id="about-photo"`
   - Cambia el `src` a tu imagen profesional

### 3. Agregar el PDF del portafolio

1. Crea o exporta tu portafolio en formato PDF
2. Nómbralo `portafolio.pdf`
3. Súbelo a la misma carpeta que `index.html`

### 4. Personalizar textos

Edita `index.html` y cambia:
- Títulos y subtítulos
- Textos de "Sobre Mí"
- Información de contacto (email, teléfono)
- Texto del footer

### 5. Cambiar colores (si lo deseas)

Edita `styles.css` y modifica las variables al inicio:

```css
:root {
    --rosa-fosforescente: #FF1493;  /* Color principal */
    --rosa-claro: #FF69B4;           /* Color hover */
    /* ... otros colores ... */
}
```

## 📱 Responsive Design

La página está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1024px+)

## 🔍 SEO y Optimización

- Meta tags incluidos para descripción
- Imágenes con atributos `alt` descriptivos
- Lazy loading para imágenes de la galería
- Código optimizado y limpio

## 📝 Notas Importantes

1. **Es una página estática**: No requiere base de datos ni servidor especial
2. **Hostinger compatible**: Funciona perfectamente en hosting compartido
3. **Sin dependencias externas**: Todo el código está incluido (excepto Google Fonts)
4. **Fácil de mantener**: Solo edita los archivos HTML, CSS y JS según necesites

## 🆘 Solución de Problemas

### La página no carga
- Verifica que `index.html` esté en la carpeta `public_html`
- Asegúrate de que el nombre del archivo sea exactamente `index.html` (en minúsculas)

### Las imágenes no aparecen
- Verifica las rutas de las imágenes
- Asegúrate de que las imágenes estén subidas al servidor
- Revisa que los nombres de archivo coincidan exactamente (mayúsculas/minúsculas importan)

### WhatsApp no funciona
- Verifica que el número esté en formato correcto (sin +, espacios ni guiones)
- El formato debe ser: código país + número (ejemplo: 521234567890)

### El PDF no se descarga
- Verifica que el archivo `portafolio.pdf` esté en la misma carpeta que `index.html`
- Asegúrate de que el nombre del archivo coincida exactamente

## 📞 Soporte

Si tienes problemas al subir la página o necesitas ayuda con la personalización, revisa la documentación de Hostinger o contacta a su soporte.

---

**¡Listo para usar!** 🎉



# PageClandestina
