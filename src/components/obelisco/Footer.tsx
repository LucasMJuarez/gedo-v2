export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1D1D1B] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="mb-4">
              <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="30" fill="white" fontSize="20" fontFamily="Nunito" fontWeight="700">
                  Buenos Aires
                </text>
                <text x="0" y="45" fill="#B3B3B3" fontSize="12" fontFamily="Nunito">
                  Ciudad
                </text>
              </svg>
            </div>
            <p className="text-sm text-[#B3B3B3] leading-relaxed">
              Sistema de Gestión de Documentos Electrónicos Oficiales del Gobierno de la Ciudad Autónoma de Buenos Aires
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-white mb-4">Enlaces útiles</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-[#B3B3B3] hover:text-white transition-colors inline-flex items-center">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] hover:text-white transition-colors inline-flex items-center">
                  Documentación técnica
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] hover:text-white transition-colors inline-flex items-center">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] hover:text-white transition-colors inline-flex items-center">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white mb-4">Contacto</h3>
            <ul className="space-y-2.5 text-sm text-[#B3B3B3]">
              <li>
                <span className="block">Mesa de ayuda</span>
                <a href="tel:147" className="text-white hover:text-[#5EC1F3] transition-colors">
                  147
                </a>
              </li>
              <li>
                <span className="block">Email</span>
                <a href="mailto:soporte@buenosaires.gob.ar" className="text-white hover:text-[#5EC1F3] transition-colors">
                  soporte@buenosaires.gob.ar
                </a>
              </li>
              <li className="mt-3 pt-3 border-t border-[#4D4D4D]">
                Lunes a viernes de 9 a 18 hs
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#4D4D4D]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#B3B3B3]">
            <p>© {currentYear} Gobierno de la Ciudad Autónoma de Buenos Aires</p>
            <p>Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
