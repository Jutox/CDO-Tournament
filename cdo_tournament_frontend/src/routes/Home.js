import React from "react";
import { Carousel } from "react-bootstrap";

function Home() {
    const carouselStyle = {
        maxWidth: '800px',
        margin: '0 auto',
    };

    const instagramLink1 = "https://www.instagram.com/p/C0gcv5dOhlc/?img_index=1"; // Enlace de la primera imagen
    const instagramLink2 = "https://www.instagram.com/p/Cv46hUHOPZj/?img_index=1"; // Enlace de la segunda imagen

    return (
        <div style={{ background: '#202124', color: '#000', minHeight: '93vh', padding: '20px' }}>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <Carousel style={carouselStyle}>
                        <Carousel.Item>
                            <a href={instagramLink1} target="_blank" rel="noopener noreferrer"> {/* Enlace a la primera imagen */}
                                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <img
                                        src="https://instagram.fccp3-1.fna.fbcdn.net/v/t39.30808-6/406870402_17938208369771234_4008566964496832234_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDEzNDQuc2RyIn0&_nc_ht=instagram.fccp3-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=RKxMzLJcQTAAX9ib3yF&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI1MTcyNTM2MjU1NTAyNzg1OA%3D%3D.2-ccb7-5&oh=00_AfDa_spheaWsJH6qg5e08vCYFdhR6QqoTQJgjq2TJDyd8A&oe=657DBE13&_nc_sid=ee9879"
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
                                        src="https://instagram.fccp3-1.fna.fbcdn.net/v/t51.2885-15/366961088_1475596486539842_6543219809077923965_n.jpg?stp=dst-jpg_e35_p1080x1080&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTQuc2RyIn0&_nc_ht=instagram.fccp3-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=NiRYZzrD1P8AX-bwekk&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzE2ODUzOTcwNzk3NzU3Mzc1NQ%3D%3D.2-ccb7-5&oh=00_AfDi7ZbolxVZzUWE8Uu85jNA0nSbImgpfdPTgp1lyZxcOw&oe=657E78EB&_nc_sid=ee9879"
                                        alt="Second slide"
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
