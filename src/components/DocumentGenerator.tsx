import { useState, useCallback } from 'react';
import { Button } from './obelisco/Button';
import { Input } from './obelisco/Input';
import { Label } from './obelisco/Label';
import { Select } from './obelisco/Select';
import { Textarea } from './obelisco/Textarea';
import { Card, CardBody } from './obelisco/Card';
import { Alert } from './obelisco/Alert';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DocumentGeneratorProps {
  onBack: () => void;
}

export function DocumentGenerator({ onBack }: DocumentGeneratorProps) {
  const [documentType, setDocumentType] = useState('');
  const [year, setYear] = useState('2025');
  const [number, setNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [generated, setGenerated] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState('');

  const handleGenerate = useCallback(() => {
    if (!documentType || !department || !subject || !content) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    const docNumber = `${documentType}-${year}-${Math.floor(Math.random() * 90000000) + 10000000}-GCABA-${department}`;
    setGeneratedNumber(docNumber);
    setGenerated(true);
    toast.success('Documento GEDO generado exitosamente', {
      description: docNumber,
    });
  }, [documentType, department, subject, content, year]);

  const handleDownload = useCallback(() => {
    toast.success('Documento descargado', {
      description: 'El documento se ha descargado en formato PDF',
    });
  }, []);

  const handleReset = useCallback(() => {
    setDocumentType('');
    setNumber('');
    setDepartment('');
    setSubject('');
    setContent('');
    setGenerated(false);
    setGeneratedNumber('');
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-[#0072C6] mb-2">Generación de Documento GEDO</h1>
        <p className="text-[#6C6C6C]">
          Complete el formulario para generar un documento electrónico oficial
        </p>
      </div>

      {/* Success Message */}
      {generated && (
        <Alert variant="success" title="Documento generado exitosamente" className="mb-6">
          Número de documento: <span className="font-mono">{generatedNumber}</span>
        </Alert>
      )}

      {/* Form */}
      <Card>
        <CardBody className="space-y-6">
          {/* Document Type */}
          <div>
            <Label htmlFor="documentType" required>
              Tipo de Documento
            </Label>
            <Select 
              id="documentType"
              value={documentType} 
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Seleccione el tipo de documento</option>
              <option value="IF">IF - Informe</option>
              <option value="DI">DI - Disposición</option>
              <option value="RES">RES - Resolución</option>
              <option value="NOT">NOT - Nota</option>
              <option value="PROV">PROV - Providencia</option>
              <option value="DICT">DICT - Dictamen</option>
            </Select>
          </div>

          {/* Year and Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Año</Label>
              <Input
                id="year"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="number">Número (Generado automáticamente)</Label>
              <Input
                id="number"
                type="text"
                value={number}
                placeholder="Se generará automáticamente"
                readOnly
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <Label htmlFor="department" required>
              Repartición
            </Label>
            <Select 
              id="department"
              value={department} 
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Seleccione la repartición</option>
              <option value="DGINF">DGINF - Dirección General de Informática</option>
              <option value="DGRRHH">DGRRHH - Dirección General de RRHH</option>
              <option value="DGCOMP">DGCOMP - Dirección General de Compras</option>
              <option value="DGJUR">DGJUR - Dirección General Jurídica</option>
              <option value="DGCONT">DGCONT - Dirección General de Contaduría</option>
              <option value="DGOB">DGOB - Dirección General de Obras</option>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject" required>
              Asunto
            </Label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ingrese el asunto del documento"
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content" required>
              Contenido del Documento
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ingrese el contenido del documento oficial..."
              className="min-h-[200px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#E5E5E5]">
            <Button
              onClick={handleGenerate}
              variant="primary"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar Documento
            </Button>
            {generated && (
              <Button
                onClick={handleDownload}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            )}
            <Button
              onClick={handleReset}
              variant="secondary"
            >
              Limpiar Formulario
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Help Text */}
      <Alert variant="info" className="mt-6">
        <strong>Nota:</strong> Los campos marcados con <span className="text-[#DC3545]">*</span> son obligatorios. 
        El documento generado podrá ser firmado digitalmente y vinculado a expedientes electrónicos 
        del sistema GDE (Gestión Documental Electrónica).
      </Alert>
    </div>
  );
}
