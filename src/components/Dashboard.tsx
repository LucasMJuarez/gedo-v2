import { useState, useMemo, useCallback } from 'react';
import { Button } from './obelisco/Button';
import { SearchInput } from './obelisco/SearchInput';
import { Select } from './obelisco/Select';
import { Badge } from './obelisco/Badge';
import { Card, CardHeader, CardBody } from './obelisco/Card';
import { FileText, Filter } from 'lucide-react';

interface DashboardProps {
  onGenerateDocument: () => void;
}

type FileStatus = 'Iniciación' | 'En Trámite' | 'Corrección' | 'Finalizado' | 'Archivado';

interface FileRecord {
  id: string;
  number: string;
  department: string;
  subject: string;
  status: FileStatus;
  lastUpdate: string;
}

const statusVariants: Record<FileStatus, 'info' | 'success' | 'warning' | 'danger' | 'neutral'> = {
  'Iniciación': 'info',
  'En Trámite': 'warning',
  'Corrección': 'danger',
  'Finalizado': 'success',
  'Archivado': 'neutral',
};

export function Dashboard({ onGenerateDocument }: DashboardProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const files: FileRecord[] = [
    {
      id: '1',
      number: 'EXP-2025-12345678-GCABA-DGINF',
      department: 'Dirección General de Informática',
      subject: 'Solicitud de equipamiento informático',
      status: 'En Trámite',
      lastUpdate: '10/10/2025 14:30'
    },
    {
      id: '2',
      number: 'EXP-2025-87654321-GCABA-DGRRHH',
      department: 'Dirección General de RRHH',
      subject: 'Licencia médica - Personal administrativo',
      status: 'Iniciación',
      lastUpdate: '09/10/2025 11:15'
    },
    {
      id: '3',
      number: 'EXP-2025-11223344-GCABA-DGCOMP',
      department: 'Dirección General de Compras',
      subject: 'Licitación pública - Mobiliario oficina',
      status: 'Corrección',
      lastUpdate: '08/10/2025 16:45'
    },
    {
      id: '4',
      number: 'EXP-2025-55667788-GCABA-DGJUR',
      department: 'Dirección General Jurídica',
      subject: 'Dictamen legal - Contrato de servicios',
      status: 'Finalizado',
      lastUpdate: '05/10/2025 09:20'
    },
    {
      id: '5',
      number: 'EXP-2025-99887766-GCABA-DGCONT',
      department: 'Dirección General de Contaduría',
      subject: 'Rendición de gastos - Septiembre 2025',
      status: 'En Trámite',
      lastUpdate: '10/10/2025 10:00'
    },
  ];

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesStatus = statusFilter === 'all' || file.status === statusFilter;
      const matchesSearch = file.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           file.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           file.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [files, statusFilter, searchQuery]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleStatusFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-primary mb-2">Escritorio Unificado</h1>
        <p className="text-[#6C6C6C]">
          Sistema de Gestión de Documentos Electrónicos Oficiales
        </p>
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-wrap gap-4">
        <Button 
          onClick={onGenerateDocument}
          variant="primary"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generar Documento GEDO
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[250px]">
              <SearchInput
                placeholder="Buscar por número, asunto o repartición..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#6C6C6C]" />
              <Select 
                value={statusFilter} 
                onChange={handleStatusFilterChange}
                className="w-[200px]"
              >
                <option value="all">Todos los estados</option>
                <option value="Iniciación">Iniciación</option>
                <option value="En Trámite">En Trámite</option>
                <option value="Corrección">Corrección</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Archivado">Archivado</option>
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[#1D1D1B]">Expedientes Activos</h2>
              <p className="text-[#6C6C6C] text-sm mt-0.5">
                {filteredFiles.length} expediente{filteredFiles.length !== 1 ? 's' : ''} encontrado{filteredFiles.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </CardHeader>

        <div className="divide-y divide-[#E5E5E5]">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="p-4 hover:bg-[#F5F6F7] transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p className="text-[#0072C6] group-hover:underline transition-all">
                      {file.number}
                    </p>
                    <Badge variant={statusVariants[file.status]}>
                      {file.status}
                    </Badge>
                  </div>
                  <p className="mb-1.5 text-[#1D1D1B]">{file.subject}</p>
                  <p className="text-sm text-[#6C6C6C]">
                    {file.department}
                  </p>
                </div>
                <div className="text-right text-sm text-[#6C6C6C] whitespace-nowrap hidden sm:block">
                  <p className="text-xs mb-0.5">Última actualización</p>
                  <p className="text-[#1D1D1B]">{file.lastUpdate}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredFiles.length === 0 && (
            <div className="p-12 text-center text-[#6C6C6C]">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-[#B3B3B3]" />
              </div>
              <p className="text-[#1D1D1B] mb-1">No se encontraron expedientes</p>
              <p className="text-sm">Intente con otros filtros de búsqueda</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
