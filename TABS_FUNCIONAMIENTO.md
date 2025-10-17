# Funcionamiento de Tabs en ConsultasExpedientes

## Resumen
El sistema de tabs está configurado para mostrar contenido solo en el tab "Consultas", mientras que los demás tabs muestran una pantalla en blanco.

## Componentes Involucrados

### 1. `src/components/ui/tabs.tsx`
- **TabsContext**: Context API que comparte el valor del tab activo entre todos los componentes
- **Tabs**: Componente contenedor que maneja el estado del tab activo
- **TabsList**: Contenedor de los botones de tabs (usa MUI Tabs)
- **TabsTrigger**: Botones individuales de cada tab (usa MUI Tab)
- **TabsContent**: Contenedor de contenido que solo se renderiza cuando su `value` coincide con el tab activo

**Comportamiento clave:**
```typescript
function TabsContent({ className, value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  
  // Solo mostrar el contenido si el value coincide con el valor activo
  if (context.value !== value) {
    return null; // No renderiza nada si no está activo
  }
  
  return (
    <Box role="tabpanel" className={className}>
      {children}
    </Box>
  );
}
```

### 2. `src/components/ConsultasExpedientes.tsx`

**Estado inicial:**
```typescript
const [activeTab, setActiveTab] = useState('consultas');
```

**Estructura de Tabs:**

1. **TabsList**: Contiene 10 TabsTrigger
   - busqueda-tema
   - busqueda-grupal
   - actividades
   - tareas-supervisadas
   - tareas-otros
   - tareas-tramite
   - **consultas** (activo por defecto)
   - administracion
   - admin-documentos
   - estadisticas

2. **TabsContent para "consultas"**: Contiene todo el contenido completo
   - 3 Accordions (Número SADE, Filtros, Domicilio)
   - Barra de acciones
   - Estadísticas rápidas (4 cards)
   - Tabla/Grilla de resultados
   - Paginación

3. **TabsContent para otros tabs**: Pantalla en blanco
   ```tsx
   {['busqueda-tema', 'busqueda-grupal', 'actividades', ...].map((tab) => (
     <TabsContent key={tab} value={tab} className="mt-6">
       <div className="min-h-[500px] bg-[#F5F6F7]">
         {/* Pantalla en blanco - sin contenido */}
       </div>
     </TabsContent>
   ))}
   ```

## Flujo de Funcionamiento

1. **Carga inicial**: 
   - `activeTab = 'consultas'`
   - Se renderiza `TabsList` con los 10 tabs
   - Solo se renderiza el `TabsContent` con `value="consultas"`
   - Los demás `TabsContent` retornan `null`

2. **Click en otro tab** (ej: "busqueda-tema"):
   - `setActiveTab('busqueda-tema')` se ejecuta
   - El contexto se actualiza con el nuevo valor
   - `TabsContent` de "consultas" retorna `null`
   - `TabsContent` de "busqueda-tema" se renderiza mostrando el div vacío con fondo gris

3. **Click en "consultas"**:
   - `setActiveTab('consultas')` se ejecuta
   - El contexto se actualiza
   - `TabsContent` de "consultas" se renderiza con todo su contenido
   - Los demás `TabsContent` retornan `null`

## Características Visuales

### Tab "Consultas"
- Muestra contenido completo con formularios, tablas, estadísticas
- Colores: Azul (#0072C6) para elementos principales
- Interfaz completa y funcional

### Otros Tabs
- Div con altura mínima de 500px
- Fondo gris claro (#F5F6F7) para simular pantalla en blanco
- Sin contenido visible

## Optimización de Rendimiento

✅ Solo se renderiza el contenido del tab activo
✅ Los demás tabs retornan `null` (no renderizan DOM)
✅ Ahorro de memoria y procesamiento
✅ Hot Module Replacement (HMR) funcionando

## Verificación

Para verificar que está funcionando:
1. Abrir http://localhost:3001/
2. Navegar a "Consultas Expedientes"
3. El tab "consultas" debe estar activo y mostrar todo el contenido
4. Hacer click en cualquier otro tab → debe mostrar pantalla gris vacía
5. Volver a "consultas" → debe mostrar el contenido nuevamente

## Estado Actual

✅ Context API implementado en tabs.tsx
✅ TabsContent verifica el valor activo antes de renderizar
✅ 10 tabs configurados en ConsultasExpedientes
✅ Tab "consultas" con contenido completo
✅ 9 tabs con pantalla en blanco (min-h-[500px] bg-[#F5F6F7])
✅ Sin errores de TypeScript
✅ Sin errores de compilación
✅ Servidor dev corriendo en puerto 3001
