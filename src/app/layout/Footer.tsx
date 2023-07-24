import React from 'react';

export const Footer = () => {
  return (
      <div className="container-fluid">
        <div className="row p-5">
          <div className="col-xs-12 col-md-6 col-lg-3">
          </div>
          <br />
          <div className="col-xs-12 col-md-6 col-lg-3">
            <p className="medium h5 mb-3 text-secondary text-decoration-none">Links</p>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="#">Términos & Condiciones</a>
            </div>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="#">Políticas De Privacidad</a>
            </div>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="#">Envíos</a>
            </div>
          </div>
            <br />
          <div className="col-xs-12 col-md-6 col-lg-3">
            <p className="medium h5 mb-3 text-secondary text-decoration-none" id="contacto">Contacto</p>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="https://www.instagram.com/camiondemadera">Instagram</a>
            </div>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="https://www.tiktok.com/@camiondemadera">TikTok</a>
            </div>
            <div className="mb-2">
              <a className="text-secondary text-decoration-none" href="https://twitter.com/JeanSeplveda2">Twitter</a>
            </div>
          </div>
            <br />
          <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="mb-2">
              <p className="medium h5 mb-2 text-secondary text-decoration-none">Formas de Pago</p>
            </div>         
          </div>       
        </div>    
      </div>
  );
};

