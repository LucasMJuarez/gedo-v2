import { useState, useMemo, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Input } from './obelisco/Input';
import { Select } from './obelisco/Select';
import { Button } from './obelisco/Button';
import { Label } from './obelisco/Label';
import { Radio } from './obelisco/Radio';
import { DatePicker } from './obelisco/DatePicker';
import { Badge } from './obelisco/Badge';
import { Search, Plus, MapPin, Trash2, Grid3x3, List, ChevronLeft, ChevronRight, MoreVertical, Eye, Edit, Trash, Download, Share2, HelpCircle, FileDown, Filter as FilterIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip } from './obelisco/Tooltip';
import { Alert } from './obelisco/Alert';
import { Breadcrumb } from './obelisco/Breadcrumb';

interface ExpedienteResultado {
  id: string;
  fecha: string;
  tema: string;
  estado: string;
  fechaModif: string;
  numeroExpediente: string;
  codigoTramite: string;
  descripcionTramite: string;
  motivoPase: string;
  usuarioAnterior: string;
}

export function ConsultasExpedientes() {
  const [activeTab, setActiveTab] = useState('consultas');
  const [tipoActuacion, setTipoActuacion] = useState('EX');
  const [anio, setAnio] = useState('');
  const [numero, setNumero] = useState('');
  const [reparticionActuacion, setReparticionActuacion] = useState('GCABA');
  
  // Filtros según tipo
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('favoritos');
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined);
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined);
  
  // Filtros domicilio
  const [tipoDomicilio, setTipoDomicilio] = useState('legal');
  const [provincia, setProvincia] = useState('CIUDAD AUTONOMA DE BUENOS AIRES');
  const [departamento, setDepartamento] = useState('CIUDAD AUTONOMA DE BUENOS AIRES');
  const [localidad, setLocalidad] = useState('');
  
  // Vista de resultados
  const [vistaResultados, setVistaResultados] = useState<'tabla' | 'grilla'>('tabla');
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(false);
  const itemsPorPagina = 10;

  // Datos de ejemplo
  const resultados: ExpedienteResultado[] = [
    {
      id: '1',
      fecha: '15/10/2025',
      tema: 'Licitación Pública',
      estado: 'En Trámite',
      fechaModif: '14/10/2025 16:30',
      numeroExpediente: 'EX-2025-12345678-GCABA-DGCOMP',
      codigoTramite: 'LP-2025-001',
      descripcionTramite: 'Licitación para adquisición de equipamiento',
      motivoPase: 'Evaluación técnica',
      usuarioAnterior: 'Juan Pérez',
    },
    {
      id: '2',
      fecha: '14/10/2025',
      tema: 'Recurso Jerárquico',
      estado: 'Iniciación',
      fechaModif: '14/10/2025 10:15',
      numeroExpediente: 'EX-2025-87654321-GCABA-DGJUR',
      codigoTramite: 'RJ-2025-045',
      descripcionTramite: 'Recurso contra Resolución Nº 123/2025',
      motivoPase: 'Análisis jurídico',
      usuarioAnterior: 'María González',
    },
    {
      id: '3',
      fecha: '13/10/2025',
      tema: 'Contratación Directa',
      estado: 'Finalizado',
      fechaModif: '13/10/2025 14:45',
      numeroExpediente: 'EX-2025-11223344-GCABA-DGCOMP',
      codigoTramite: 'CD-2025-089',
      descripcionTramite: 'Contratación de servicios de limpieza',
      motivoPase: 'Firma de contrato',
      usuarioAnterior: 'Carlos Rodríguez',
    },
  ];

  // Memoizar cálculos
  const totalPaginas = useMemo(() => {
    return Math.ceil(resultados.length / itemsPorPagina);
  }, [resultados.length, itemsPorPagina]);

  const resultadosPaginados = useMemo(() => {
    return resultados.slice(
      (paginaActual - 1) * itemsPorPagina,
      paginaActual * itemsPorPagina
    );
  }, [resultados, paginaActual, itemsPorPagina]);

  // Estadísticas memoizadas
  const estadisticas = useMemo(() => {
    return {
      total: resultados.length,
      enTramite: resultados.filter(r => r.estado === 'En Trámite').length,
      finalizados: resultados.filter(r => r.estado === 'Finalizado').length,
      iniciacion: resultados.filter(r => r.estado === 'Iniciación').length,
    };
  }, [resultados]);

  // Event handlers memoizados
  const handleVistaTabla = useCallback(() => {
    setVistaResultados('tabla');
  }, []);

  const handleVistaGrilla = useCallback(() => {
    setVistaResultados('grilla');
  }, []);

  const handlePaginaAnterior = useCallback(() => {
    setPaginaActual(prev => Math.max(1, prev - 1));
  }, []);

  const handlePaginaSiguiente = useCallback(() => {
    setPaginaActual(prev => Math.min(totalPaginas, prev + 1));
  }, [totalPaginas]);

  const handleCambioPagina = useCallback((page: number) => {
    setPaginaActual(page);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F6F7]">
      <div className="bg-[#0072C6] text-white py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white">Consultas Expedientes</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Breadcrumb items={[
          { label: 'Inicio' },
          { label: 'GEDO' },
          { label: 'Consultas Expedientes' },
        ]} />

        <Alert variant="info" className="mb-6">
          <p>
            <strong>Sistema de Consulta de Expedientes GEDO.</strong> Utilice los filtros disponibles para buscar expedientes por número SADE, criterios personalizados o datos de domicilio. Los resultados se pueden visualizar en formato tabla o grilla.
          </p>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList data-tabs-list className="w-full inline-flex justify-start bg-white border-b border-[#E5E5E5] rounded-none h-auto p-0">
            <TabsTrigger 
              value="busqueda-tema" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Búsqueda por Tema
            </TabsTrigger>
            <TabsTrigger 
              value="busqueda-grupal"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Búsqueda Grupal
            </TabsTrigger>
            <TabsTrigger 
              value="actividades"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Actividades
            </TabsTrigger>
            <TabsTrigger 
              value="tareas-supervisadas"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Tareas Supervisadas
            </TabsTrigger>
            <TabsTrigger 
              value="tareas-otros"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Tareas Otros Usuarios
            </TabsTrigger>
            <TabsTrigger 
              value="tareas-tramite"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Tareas en Trámite
            </TabsTrigger>
            <TabsTrigger 
              value="consultas"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Consultas
            </TabsTrigger>
            
            <TabsTrigger 
              value="administracion"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Administración
            </TabsTrigger>
            <TabsTrigger 
              value="admin-documentos"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Admin Documentos
            </TabsTrigger>
            <TabsTrigger 
              value="estadisticas"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0072C6] data-[state=active]:bg-transparent px-4 py-3 whitespace-nowrap"
            >
              Estadísticas Expediente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultas" className="mt-6">
            <Accordion type="multiple" defaultValue={['numero-sade', 'filtros', 'domicilio']} className="space-y-4">
              {/* Consultar por Número SADE */}
              <AccordionItem value="numero-sade" className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-[#F5F6F7] text-[#0072C6]">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>Consultar Expedientes por Número SADE</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <p className="text-sm text-[#6C6C6C]">Filtros de búsqueda</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label>Tipo Actuación</Label>
                        <Select 
                          value={tipoActuacion} 
                          onChange={(e) => setTipoActuacion(e.target.value)}
                        >
                          <option value="EX">EX</option>
                          <option value="IF">IF</option>
                          <option value="NOT">NOT</option>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Año</Label>
                        <Input 
                          type="text"
                          placeholder="AAAA"
                          value={anio}
                          onChange={(e) => setAnio(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label>Número</Label>
                        <Input 
                          type="text"
                          placeholder="Número"
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label>Repartición Actuación</Label>
                        <Select 
                          value={reparticionActuacion} 
                          onChange={(e) => setReparticionActuacion(e.target.value)}
                        >
                          <option value="GCABA">GCABA</option>
                          <option value="DGCOMP">DGCOMP</option>
                          <option value="DGJUR">DGJUR</option>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="primary">
                        <Search className="w-4 h-4 mr-2" />
                        Buscar
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Consultar según Filtro */}
              <AccordionItem value="filtros" className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-[#F5F6F7] text-[#0072C6]">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    <span>Consultar Expedientes según Filtro</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-[#6C6C6C] mb-3">Filtros de búsqueda</p>
                      <div className="space-y-2">
                        <Radio 
                          name="filtro" 
                          value="favoritos"
                          checked={filtroSeleccionado === 'favoritos'}
                          onChange={(e) => setFiltroSeleccionado(e.target.value)}
                          label="Mis Favoritos"
                        />
                        <Radio 
                          name="filtro" 
                          value="tramitados-mi"
                          checked={filtroSeleccionado === 'tramitados-mi'}
                          onChange={(e) => setFiltroSeleccionado(e.target.value)}
                          label="Tramitados por mí"
                        />
                        <Radio 
                          name="filtro" 
                          value="tramitados-reparticion"
                          checked={filtroSeleccionado === 'tramitados-reparticion'}
                          onChange={(e) => setFiltroSeleccionado(e.target.value)}
                          label="Tramitados por mi repartición"
                        />
                        <Radio 
                          name="filtro" 
                          value="tramitados-jurisdiccion"
                          checked={filtroSeleccionado === 'tramitados-jurisdiccion'}
                          onChange={(e) => setFiltroSeleccionado(e.target.value)}
                          label="Tramitados por mi jurisdicción"
                        />
                      </div>
                    </div>

                    <div className="border-t border-[#E5E5E5] pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-[#6C6C6C]">Filtros Aplicados</p>
                          <Tooltip content="Puede aplicar múltiples filtros para refinar su búsqueda">
                            <button className="text-[#0072C6] hover:text-[#005a9e]">
                              <HelpCircle className="w-4 h-4" />
                            </button>
                          </Tooltip>
                        </div>
                        <div className="flex gap-2">
                          <Tooltip content="Vista de tabla">
                            <button 
                              onClick={() => setVistaResultados('tabla')}
                              className={`p-2 rounded ${vistaResultados === 'tabla' ? 'bg-[#0072C6] text-white' : 'text-[#6C6C6C] hover:bg-[#F5F5F5]'}`}
                              aria-label="Vista de tabla"
                            >
                              <List className="w-4 h-4" />
                            </button>
                          </Tooltip>
                          <Tooltip content="Vista de grilla">
                            <button 
                              onClick={() => setVistaResultados('grilla')}
                              className={`p-2 rounded ${vistaResultados === 'grilla' ? 'bg-[#0072C6] text-white' : 'text-[#6C6C6C] hover:bg-[#F5F5F5]'}`}
                              aria-label="Vista de grilla"
                            >
                              <Grid3x3 className="w-4 h-4" />
                            </button>
                          </Tooltip>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label>Fecha Desde</Label>
                          <DatePicker 
                            value={fechaDesde}
                            onChange={setFechaDesde}
                            placeholder="Seleccione fecha"
                          />
                        </div>
                        <div>
                          <Label>Fecha Hasta</Label>
                          <DatePicker 
                            value={fechaHasta}
                            onChange={setFechaHasta}
                            placeholder="Seleccione fecha"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="secondary">
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar
                        </Button>
                        <Button variant="primary">
                          <MapPin className="w-4 h-4 mr-2" />
                          Ubicar
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Consultar según Domicilio */}
              <AccordionItem value="domicilio" className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:bg-[#F5F6F7] text-[#0072C6]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Consultar Expedientes según Domicilio</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[#6C6C6C] mb-3">Tipo de Domicilio</p>
                      <div className="flex gap-4">
                        <Radio 
                          name="tipoDomicilio" 
                          value="legal"
                          checked={tipoDomicilio === 'legal'}
                          onChange={(e) => setTipoDomicilio(e.target.value)}
                          label="Domicilio Legal Constituido"
                        />
                        <Radio 
                          name="tipoDomicilio" 
                          value="catastral"
                          checked={tipoDomicilio === 'catastral'}
                          onChange={(e) => setTipoDomicilio(e.target.value)}
                          label="Datos Catastrales"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label>Provincia</Label>
                        <Select 
                          value={provincia} 
                          onChange={(e) => setProvincia(e.target.value)}
                        >
                          <option value="CIUDAD AUTONOMA DE BUENOS AIRES">CIUDAD AUTONOMA DE BUENOS AIRES</option>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Departamento</Label>
                        <Select 
                          value={departamento} 
                          onChange={(e) => setDepartamento(e.target.value)}
                        >
                          <option value="CIUDAD AUTONOMA DE BUENOS AIRES">CIUDAD AUTONOMA DE BUENOS AIRES</option>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Localidad</Label>
                        <Select 
                          value={localidad} 
                          onChange={(e) => setLocalidad(e.target.value)}
                        >
                          <option value="">Seleccione</option>
                        </Select>
                      </div>

                      <div>
                        <Label>Calle y Altura</Label>
                        <Input type="text" placeholder="Calle y número" />
                      </div>

                      <div>
                        <Label>Comando</Label>
                        <Input type="text" placeholder="Comando" />
                      </div>

                      <div>
                        <Label>Barrio</Label>
                        <Input type="text" placeholder="Barrio" />
                      </div>

                      <div>
                        <Label>Sección</Label>
                        <Input type="text" placeholder="Sección" />
                      </div>

                      <div>
                        <Label>Manzana</Label>
                        <Input type="text" placeholder="Manzana" />
                      </div>

                      <div>
                        <Label>Parcela</Label>
                        <Input type="text" placeholder="Parcela" />
                      </div>

                      <div>
                        <Label>CU</Label>
                        <Input type="text" placeholder="CU" />
                      </div>

                      <div>
                        <Label>Piso</Label>
                        <Input type="text" placeholder="Piso" />
                      </div>

                      <div>
                        <Label>Depto</Label>
                        <Input type="text" placeholder="Depto" />
                      </div>

                      <div>
                        <Label>CP</Label>
                        <Input type="text" placeholder="Código Postal" />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="primary">
                        <Search className="w-4 h-4 mr-2" />
                        Buscar
                      </Button>
                      <Button variant="outline">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Limpiar
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Barra de acciones sobre resultados */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E5E5E5] rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-[#6C6C6C]" />
                <span className="text-sm text-[#6C6C6C]">
                  {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileDown className="w-4 h-4 mr-2" />
                  Exportar Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-1">Total Expedientes</p>
                    <p className="text-[#1D1D1B]">{resultados.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#E3F2FD] rounded-full flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#0072C6]" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-1">En Trámite</p>
                    <p className="text-[#1D1D1B]">
                      {resultados.filter(r => r.estado === 'En Trámite').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#FFF3E0] rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#F59C00]" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-1">Finalizados</p>
                    <p className="text-[#1D1D1B]">
                      {resultados.filter(r => r.estado === 'Finalizado').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#5CB615]" />
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6C6C6C] mb-1">Iniciación</p>
                    <p className="text-[#1D1D1B]">
                      {resultados.filter(r => r.estado === 'Iniciación').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-[#E3F2FD] rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#0072C6]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="mt-6 bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
              {resultados.length === 0 ? (
                <div className="py-16 px-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-[#F5F6F7] rounded-full flex items-center justify-center">
                    <Search className="w-10 h-10 text-[#B3B3B3]" />
                  </div>
                  <h3 className="text-[#1D1D1B] mb-2">No se encontraron expedientes</h3>
                  <p className="text-[#6C6C6C] mb-6 max-w-md mx-auto">
                    No hay expedientes que coincidan con los criterios de búsqueda seleccionados. 
                    Intente modificar los filtros o realizar una nueva búsqueda.
                  </p>
                  <Button variant="primary">
                    <Search className="w-4 h-4 mr-2" />
                    Nueva búsqueda
                  </Button>
                </div>
              ) : vistaResultados === 'tabla' ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0072C6] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Fecha</th>
                        <th className="px-4 py-3 text-left">Tema/Estado</th>
                        <th className="px-4 py-3 text-left">Fecha Últ. Modif.</th>
                        <th className="px-4 py-3 text-left">Número Expediente</th>
                        <th className="px-4 py-3 text-left">Código Trámite</th>
                        <th className="px-4 py-3 text-left">Descripción del Trámite</th>
                        <th className="px-4 py-3 text-left">Motivo Pase</th>
                        <th className="px-4 py-3 text-left">Usuario Anterior</th>
                        <th className="px-4 py-3 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E5]">
                      {resultadosPaginados.map((resultado) => (
                        <tr key={resultado.id} className="hover:bg-[#F5F6F7] transition-colors">
                          <td className="px-4 py-3 text-sm">{resultado.fecha}</td>
                          <td className="px-4 py-3">
                            <div>
                              <div className="text-sm">{resultado.tema}</div>
                              <Badge 
                                variant={
                                  resultado.estado === 'Finalizado' ? 'success' : 
                                  resultado.estado === 'En Trámite' ? 'warning' : 
                                  'info'
                                }
                                className="mt-1"
                              >
                                {resultado.estado}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{resultado.fechaModif}</td>
                          <td className="px-4 py-3 text-sm text-[#0072C6]">{resultado.numeroExpediente}</td>
                          <td className="px-4 py-3 text-sm">{resultado.codigoTramite}</td>
                          <td className="px-4 py-3 text-sm">{resultado.descripcionTramite}</td>
                          <td className="px-4 py-3 text-sm">{resultado.motivoPase}</td>
                          <td className="px-4 py-3 text-sm">{resultado.usuarioAnterior}</td>
                          <td className="px-4 py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors">
                                  <MoreVertical className="w-4 h-4 text-[#6C6C6C]" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Descargar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Compartir
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[#DC3545]">
                                  <Trash className="w-4 h-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {resultadosPaginados.map((resultado) => (
                    <div key={resultado.id} className="border border-[#E5E5E5] rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <Badge 
                          variant={
                            resultado.estado === 'Finalizado' ? 'success' : 
                            resultado.estado === 'En Trámite' ? 'warning' : 
                            'info'
                          }
                        >
                          {resultado.estado}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-[#F5F5F5] rounded-full transition-colors">
                              <MoreVertical className="w-4 h-4 text-[#6C6C6C]" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Descargar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="w-4 h-4 mr-2" />
                              Compartir
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[#DC3545]">
                              <Trash className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="text-[#0072C6] mb-2">{resultado.numeroExpediente}</h3>
                      <p className="text-sm mb-2">{resultado.tema}</p>
                      <p className="text-sm text-[#6C6C6C] mb-1">{resultado.descripcionTramite}</p>
                      <div className="text-xs text-[#6C6C6C] mt-3 space-y-1">
                        <div className="flex justify-between">
                          <span>Fecha:</span>
                          <span>{resultado.fecha}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Última modif.:</span>
                          <span>{resultado.fechaModif}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Usuario:</span>
                          <span>{resultado.usuarioAnterior}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Paginación */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#E5E5E5] bg-[#F5F6F7]">
                <div className="text-sm text-[#6C6C6C] text-center md:text-left">
                  Mostrando {(paginaActual - 1) * itemsPorPagina + 1} a{' '}
                  {Math.min(paginaActual * itemsPorPagina, resultados.length)} de {resultados.length} resultados
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip content="Página anterior">
                    <button
                      onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                      disabled={paginaActual === 1}
                      className="px-3 py-2 border border-[#E5E5E5] rounded bg-white hover:bg-[#F5F6F7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </Tooltip>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handleCambioPagina(page)}
                        className={`px-3 py-2 border rounded transition-colors ${
                          paginaActual === page
                            ? 'bg-[#0072C6] text-white border-[#0072C6]'
                            : 'bg-white border-[#E5E5E5] hover:bg-[#F5F6F7]'
                        }`}
                        aria-label={`Página ${page}`}
                        aria-current={paginaActual === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <Tooltip content="Página siguiente">
                    <button
                      onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                      disabled={paginaActual === totalPaginas}
                      className="px-3 py-2 border border-[#E5E5E5] rounded bg-white hover:bg-[#F5F6F7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Página siguiente"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Otros tabs - pantalla en blanco */}
          {['busqueda-tema', 'busqueda-grupal', 'actividades', 'tareas-supervisadas', 'tareas-otros', 'tareas-tramite', 'administracion', 'admin-documentos', 'estadisticas'].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="min-h-[500px] bg-white border border-[#E5E5E5] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-[#1D1D1B] mb-2">Contenido en desarrollo</h3>
                  <p className="text-[#6C6C6C]">Esta sección estará disponible próximamente.</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
