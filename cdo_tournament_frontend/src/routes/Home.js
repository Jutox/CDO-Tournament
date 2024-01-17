import React from "react";
import { Carousel } from "react-bootstrap";

function Home() {
    const carouselStyle = {
        maxWidth: '800px',
        margin: '0 auto',
    };

    const instagramLink1 = "https://www.instagram.com/p/C0gcv5dOhlc/?img_index=1"; // Enlace de la primera imagen
    const instagramLink2 = "https://www.instagram.com/p/C15CtVOusRC/?img_index=1"; // Enlace de la segunda imagen
    const instagramLink3 = "https://www.instagram.com/p/Cv46hUHOPZj/?img_index=1"; // Enlace de la segunda imagen

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '100vh', padding: '20px' , paddingTop: '80px' }}>
            &nbsp;
            <h2 className="text-center" style={{ color: '#ffffff' }}>
                Bienvenido!
            </h2>
            &nbsp;
            <div className="container mt-5">
                <div className="row justify-content-center">
                    &nbsp;
                    <h3 className="text-center" style={{ color: '#ffffff' }}>
                        Ultimas Noticias CDO
                    </h3>
                    &nbsp;
                    <Carousel style={carouselStyle}>
                        <Carousel.Item>
                            <a href={instagramLink1} target="_blank" rel="noopener noreferrer"> {/* Enlace a la primera imagen */}
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <img
                                        src="https://i.postimg.cc/9QmTrGYJ/406870402-17938208369771234-4008566964496832234-n.jpg"
                                        alt="First slide"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                            </a>
                            <Carousel.Caption>
                                <p>Agradecer a nuestros Colaboradores por hacer posible esta liga CDO Hércules 2023, culminó con una ceremonia de premiación emotiva y merecida por el esfuerzo entregado en estos siete meses de competencia.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href={instagramLink2} target="_blank" rel="noopener noreferrer"> {/* Enlace a la segunda imagen */}
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <img
                                        src="https://i.postimg.cc/TwghkwcK/417956713-287036314349618-134275146368272860-n.jpg"
                                        alt="Second slide"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                            </a>
                            <Carousel.Caption>
                                <p>
                                    Se Viene !!!
                                    Este año una temática diferente, Gala - Aniversario CDO 23-24... agradecidos de cada persona que permanece en el club y también de los que han pasado por el, todos dejan su huella, se llevan un pedacito nuestro y siempre les deseamos las mejores vibras... ❤️🔥❤️‍🔥🏐💪🏽</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <a href={instagramLink3} target="_blank" rel="noopener noreferrer"> {/* Enlace a la segunda imagen */}
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <img
                                        src="https://i.postimg.cc/k4sPXPJj/366961088-1475596486539842-6543219809077923965-n.jpg"
                                        alt="third slide"
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                            </a>
                            <Carousel.Caption>
                                <p>Damas TC en Liga surB</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Home;
