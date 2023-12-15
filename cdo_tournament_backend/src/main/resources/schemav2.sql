INSERT INTO `equipo` (`id_equipo`, `nombre_entrenador`, `nombre_equipo`) VALUES
(1, 'David Fernandez', 'CDO Chillan Viejo'),
(2, 'Abraham Nemeiaz', 'Avanze Trawen');

INSERT INTO `torneo` (`id_torneo`, `fecha_inicio`, `fecha_termino`, `lugar`, `nombre`) VALUES
(1, '2023-11-10', '2023-11-12', 'chillan', 'Cdo Hercules');

INSERT INTO `jugador` (`id_jugador`, `alcance_bloqueo`, `alcance_mano`, `apellido_materno`, `apellido_paterno`, `email`, `estatura`, `fecha_nacimiento`, `genero`, `nombres`, `peso`, `rut`, `telefono`) VALUES
(1, 400, 280, 'Gomez', 'Lopez', 'gomez.lopez@gmail.com', 175, '1995-05-15', 'M', 'Carlos Alberto', 80, '12345678-9', '987654321'),
(2, 300, 320, 'Ramirez', 'Hernandez', 'ramirez.hernandez@gmail.com', 180, '1992-08-20', 'F', 'Maria Elena', 65, '98765432-1', '123456789'),
(3, 250, 310, 'Fernandez', 'Rodriguez', 'fernandez.rodriguez@gmail.com', 170, '1998-03-10', 'M', 'Juan Manuel', 72, '23456789-0', '456789123'),
(4, 360, 290, 'Lopez', 'Gonzalez', 'lopez.gonzalez@gmail.com', 185, '1990-12-05', 'F', 'Ana Maria', 58, '34567890-1', '789123456'),
(5, 320, 270, 'Martinez', 'Perez', 'martinez.perez@gmail.com', 160, '1994-09-25', 'M', 'Pedro Luis', 90, '45678901-2', '234567890'),
(6, 420, 300, 'Diaz', 'Sanchez', 'diaz.sanchez@gmail.com', 172, '1997-06-14', 'F', 'Luisa Fernanda', 62, '56789012-3', '345678901'),
(7, 280, 330, 'Gonzalez', 'Torres', 'gonzalez.torres@gmail.com', 177, '1993-01-30', 'M', 'Fernando Jose', 76, '67890123-4', '456789012'),
(8, 340, 270, 'Hernandez', 'Martinez', 'hernandez.martinez@gmail.com', 168, '1996-11-18', 'F', 'Laura Patricia', 68, '78901234-5', '567890123'),
(9, 380, 310, 'Sanchez', 'Gomez', 'sanchez.gomez@gmail.com', 183, '1991-07-22', 'M', 'Roberto Carlos', 88, '89012345-6', '678901234'),
(10, 290, 320, 'Perez', 'Fernandez', 'perez.fernandez@gmail.com', 170, '1999-04-02', 'F', 'Isabel Cristina', 55, '90123456-7', '789012345'),
(11, 410, 280, 'Torres', 'Lopez', 'torres.lopez@gmail.com', 176, '1992-03-08', 'M', 'Javier Antonio', 75, '01234567-8', '890123456'),
(12, 270, 310, 'Rodriguez', 'Ramirez', 'rodriguez.ramirez@gmail.com', 179, '1994-08-11', 'F', 'Marta Sofia', 70, '12345678-9', '901234567'),
(13, 350, 290, 'Lopez', 'Diaz', 'lopez.diaz@gmail.com', 168, '1997-05-19', 'M', 'Ricardo Andres', 82, '23456789-0', '012345678'),
(14, 330, 330, 'Martinez', 'Hernandez', 'martinez.hernandez@gmail.com', 182, '1993-12-27', 'F', 'Carolina Andrea', 63, '34567890-1', '123456789'),
(15, 390, 300, 'Gomez', 'Sanchez', 'gomez.sanchez@gmail.com', 174, '1995-10-03', 'M', 'Fernando Alberto', 95, '45678901-2', '234567890'),
(16, 300, 310, 'Ramirez', 'Perez', 'ramirez.perez@gmail.com', 169, '1998-02-28', 'F', 'Maria Teresa', 59, '56789012-3', '345678901'),
(17, 410, 290, 'Fernandez', 'Gonzalez', 'fernandez.gonzalez@gmail.com', 183, '1990-09-14', 'M', 'Luis Eduardo', 77, '67890123-4', '456789012'),
(18, 270, 330, 'Lopez', 'Martinez', 'lopez.martinez@gmail.com', 176, '1996-06-26', 'F', 'Patricia Isabel', 69, '78901234-5', '567890123'),
(19, 350, 280, 'Martinez', 'Sanchez', 'martinez.sanchez@gmail.com', 170, '1991-04-10', 'M', 'Alejandro Jose', 87, '89012345-6', '678901234'),
(20, 390, 310, 'Gonzalez', 'Perez', 'gonzalez.perez@gmail.com', 181, '1994-03-01', 'F', 'Ana Patricia', 66, '90123456-7', '789012345');


INSERT INTO `partido` (`id_partido`, `categoria`, `ciudad`, `codigo_pais`, `division`, `fase`, `fecha`, `hora`, `nombre_competicion`, `numero_partido`, `recinto`, `torneo_id`) VALUES
(2, 'Senior', 'CHILLÁN', 'ch', 'Masculino', 'Final', '2023-11-29', '2023-11-28T19:30:00.775Z', 'Final Copa Chile', 3, 'Cancha Quilamapu', 1);

INSERT INTO `lista_jugadores_partido` VALUES 
(1,1,1),
(2,2,1),
(3,1,2),
(4,3,2);

INSERT INTO `set_Partido` VALUES (1,NULL,NULL,25,23,1,1),
(2,NULL,NULL,23,25,2,1),(3,NULL,NULL,25,17,3,1),
(4,NULL,NULL,25,16,4,1),(5,NULL,NULL,25,5,1,2),
(6,NULL,NULL,25,10,2,2),(7,NULL,NULL,25,15,3,2);

INSERT INTO `jugador_partido` (`id_jugador_partido`, `capitan`, `numero_camiseta`, `jugador_id`, `lista_jugadores_partido_id`) VALUES
(1, b'0', 10, 3, 1),
(2, b'0', 11, 5, 1),
(3, b'0', 0, 9, 2),
(4, b'0', 1, 13, 2),
(5, b'0', 13, 3, 3);



INSERT INTO `evento` (`id_evento`, `hora`, `orden_servicio`, `puntos`, `ronda_servicio`, `tipo_evento`, `jugador_partido_id`, `set_id`) VALUES
(1, '2023-11-28T19:15:00.582Z', 3, 1, 2, 'ATAQUE_EXITOSO', 1, 1),
(2, '2023-11-28T19:30:00.380Z', 2, 1, 3, 'ATAQUE_EXITOSO', 1, 1),
(3, '2023-11-28T19:30:00.205Z', 2, 1, 3, 'ATAQUE_EXITOSO', 1, 1),
(4, '2023-11-28T19:45:00.325Z', 1, -1, 2, 'ATAQUE_FALLIDO', 1, 1),
(5, '2023-11-28T19:45:00.699Z', 3, -1, 2, 'ATAQUE_FALLIDO', 1, 1),
(6, '2023-11-28T22:00:00.350Z', 3, 1, 4, 'SAQUE_EXITOSO', 1, 1),
(7, '2023-11-28T21:45:00.572Z', 1, -1, 2, 'SAQUE_FALLIDO', 1, 1),
(17, '2023-12-06T04:30:00.733Z', 2, 1, 3, 'ATAQUE_EXITOSO', 5, 2),
(18, '2023-12-06T10:30:00.096Z', 1, 1, 1, 'BLOQUEO_EXITOSO', 1, 1),
(19, '2023-12-06T11:00:00.802Z', 2, 1, 3, 'PENALIZACION', 1, 2),
(20, '2023-12-06T11:00:00.726Z', 2, 1, 3, 'ADVERTENCIA', 1, 1),
(21, '2023-12-06T11:00:00.929Z', 2, 1, 3, 'DESCALIFICACION', 1, 5),
(22, '', 2, 1, 3, 'ADVERTENCIA', 1, 2),
(23, '2023-12-06T08:45:00.693Z', 2, 1, 3, 'ADVERTENCIA', 5, 3);



INSERT INTO `jugador` (`id_jugador`, `alcance_bloqueo`, `alcance_mano`, `apellido_materno`, `apellido_paterno`, `email`, `estatura`, `fecha_nacimiento`, `genero`, `nombres`, `peso`, `rut`, `telefono`) VALUES
(1, 400, 280, 'Gomez', 'Lopez', 'gomez.lopez@gmail.com', 175, '1995-05-15', 'M', 'Carlos Alberto', 80, '12345678-9', '987654321'),
(2, 300, 320, 'Ramirez', 'Hernandez', 'ramirez.hernandez@gmail.com', 180, '1992-08-20', 'F', 'Maria Elena', 65, '98765432-1', '123456789'),
(3, 250, 310, 'Fernandez', 'Rodriguez', 'fernandez.rodriguez@gmail.com', 170, '1998-03-10', 'M', 'Juan Manuel', 72, '23456789-0', '456789123'),
(4, 360, 290, 'Lopez', 'Gonzalez', 'lopez.gonzalez@gmail.com', 185, '1990-12-05', 'F', 'Ana Maria', 58, '34567890-1', '789123456'),
(5, 320, 270, 'Martinez', 'Perez', 'martinez.perez@gmail.com', 160, '1994-09-25', 'M', 'Pedro Luis', 90, '45678901-2', '234567890'),
(6, 420, 300, 'Diaz', 'Sanchez', 'diaz.sanchez@gmail.com', 172, '1997-06-14', 'F', 'Luisa Fernanda', 62, '56789012-3', '345678901'),
(7, 280, 330, 'Gonzalez', 'Torres', 'gonzalez.torres@gmail.com', 177, '1993-01-30', 'M', 'Fernando Jose', 76, '67890123-4', '456789012'),
(8, 340, 270, 'Hernandez', 'Martinez', 'hernandez.martinez@gmail.com', 168, '1996-11-18', 'F', 'Laura Patricia', 68, '78901234-5', '567890123'),
(9, 380, 310, 'Sanchez', 'Gomez', 'sanchez.gomez@gmail.com', 183, '1991-07-22', 'M', 'Roberto Carlos', 88, '89012345-6', '678901234'),
(10, 290, 320, 'Perez', 'Fernandez', 'perez.fernandez@gmail.com', 170, '1999-04-02', 'F', 'Isabel Cristina', 55, '90123456-7', '789012345'),
(11, 410, 280, 'Torres', 'Lopez', 'torres.lopez@gmail.com', 176, '1992-03-08', 'M', 'Javier Antonio', 75, '01234567-8', '890123456'),
(12, 270, 310, 'Rodriguez', 'Ramirez', 'rodriguez.ramirez@gmail.com', 179, '1994-08-11', 'F', 'Marta Sofia', 70, '12345678-9', '901234567'),
(13, 350, 290, 'Lopez', 'Diaz', 'lopez.diaz@gmail.com', 168, '1997-05-19', 'M', 'Ricardo Andres', 82, '23456789-0', '012345678'),
(14, 330, 330, 'Martinez', 'Hernandez', 'martinez.hernandez@gmail.com', 182, '1993-12-27', 'F', 'Carolina Andrea', 63, '34567890-1', '123456789'),
(15, 390, 300, 'Gomez', 'Sanchez', 'gomez.sanchez@gmail.com', 174, '1995-10-03', 'M', 'Fernando Alberto', 95, '45678901-2', '234567890'),
(16, 300, 310, 'Ramirez', 'Perez', 'ramirez.perez@gmail.com', 169, '1998-02-28', 'F', 'Maria Teresa', 59, '56789012-3', '345678901'),
(17, 410, 290, 'Fernandez', 'Gonzalez', 'fernandez.gonzalez@gmail.com', 183, '1990-09-14', 'M', 'Luis Eduardo', 77, '67890123-4', '456789012'),
(18, 270, 330, 'Lopez', 'Martinez', 'lopez.martinez@gmail.com', 176, '1996-06-26', 'F', 'Patricia Isabel', 69, '78901234-5', '567890123'),
(19, 350, 280, 'Martinez', 'Sanchez', 'martinez.sanchez@gmail.com', 170, '1991-04-10', 'M', 'Alejandro Jose', 87, '89012345-6', '678901234'),
(20, 390, 310, 'Gonzalez', 'Perez', 'gonzalez.perez@gmail.com', 181, '1994-03-01', 'F', 'Ana Patricia', 66, '90123456-7', '789012345');


INSERT INTO `torneo` (`id_torneo`, `fecha_inicio`, `fecha_termino`, `lugar`, `nombre`) VALUES
(1, '2023-11-10', '2023-11-12', 'chillan', 'Cdo Hercules'),
(2, '2023-12-20', '2023-12-30', 'santiago', 'Unash torunament');

INSERT INTO `equipo` (`id_equipo`, `nombre_entrenador`, `nombre_equipo`) VALUES
(1, 'David Fernandez', 'CDO Chillan Viejo'),
(2, 'Abraham Nemeiaz', 'Avanze Trawen'),
(3, 'Igor Sepulveda', 'Voley Mas'),
(4, 'Perez Rojas', 'Huachipato A'),
(5, 'Perez Rojas', 'Huachipato B');

INSERT INTO `partido` (`id_partido`, `categoria`, `ciudad`, `codigo_pais`, `division`, `fase`, `fecha`, `hora`, `nombre_competicion`, `numero_partido`, `recinto`, `torneo_id`) VALUES
(2, 'Senior', 'CHILLÁN', 'ch', 'Masculino', 'Final', '2023-11-22', '2023-11-28T19:30:00.775Z', 'Final Copa Chile', 3, 'Cancha Quilamapu', 2),
(3, 'Senior', 'CHILLÁN', 'ch', 'Masculino', 'Semi-Final', '2023-12-01', '2023-12-01T00:30:00.536Z', 'Final Copa argentina', 1, 'cancah chillan viejo', 1),
(12, 'Senior', 'CHILLÁN', 'ch', 'Masculino', 'Semi-Final', '2023-12-07', '2023-12-07T05:45:00.631Z', 'Semi-Final Copa Unash', 3, 'estadio Nacional', 2),
(13, 'Senior', 'CHILLÁN', 'ch', 'Masculino', 'Regular', '2023-12-28', '2023-12-07T05:30:00.893Z', 'Final Copa UBB', 2, 'cancha fernando may', 1);

INSERT INTO `lista_jugadores_partido` (`id_lista_jugadores_partido`, `equipo_id`, `partido_id`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 4, 12),
(4, 5, 12);

INSERT INTO `jugador_partido` (`id_jugador_partido`, `capitan`, `numero_camiseta`, `jugador_id`, `lista_jugadores_partido_id`) VALUES
(1, b'0', 10, 3, 1),
(2, b'0', 11, 5, 1),
(3, b'0', 0, 9, 2),
(4, b'0', 1, 13, 2),
(5, b'0', 13, 3, 3);


INSERT INTO `set_partido` (`id_set_partido`, `hora_inicio`, `hora_termino`, `numero_set`, `puntajea`, `puntajeb`, `partido_id`) VALUES
(1, '2023-11-28T18:30:00.999Z', '2023-11-28T19:00:00.109Z', 1, 15, 17, 2),
(2, '2023-12-01T00:00:00.765Z', '2023-12-01T00:15:00.387Z', 2, 14, 15, 3),
(3, '2023-12-03T19:00:00.458Z', '2023-12-03T19:30:00.767Z', 1, 12, 42, 2),
(4, '2023-12-03T19:45:00.760Z', '2023-12-03T20:15:00.444Z', 1, 12, 13, 2),
(5, '2023-12-03T19:45:00.171Z', '2023-12-03T20:15:00.808Z', 1, 145, 14, 3),
(6, '2023-12-03T20:15:00.000Z', '2023-12-03T22:30:00.000Z', 5, 200, 14, 2),
(7, '2023-12-07T05:15:00.008Z', '2023-12-07T05:15:00.695Z', 1, 24, 26, 13);

INSERT INTO `evento` (`id_evento`, `hora`, `orden_servicio`, `puntos`, `ronda_servicio`, `tipo_evento`, `jugador_partido_id`, `set_id`) VALUES
(1, '2023-11-28T19:15:00.582Z', 3, 1, 2, 'ATAQUE_EXITOSO', 1, 1),
(2, '2023-11-28T19:30:00.380Z', 2, 1, 3, 'ATAQUE_EXITOSO', 1, 1),
(3, '2023-11-28T19:30:00.205Z', 2, 1, 3, 'ATAQUE_EXITOSO', 1, 1),
(4, '2023-11-28T19:45:00.325Z', 1, -1, 2, 'ATAQUE_FALLIDO', 1, 1),
(5, '2023-11-28T19:45:00.699Z', 3, -1, 2, 'ATAQUE_FALLIDO', 1, 1),
(6, '2023-11-28T22:00:00.350Z', 3, 1, 4, 'SAQUE_EXITOSO', 1, 1),
(7, '2023-11-28T21:45:00.572Z', 1, -1, 2, 'SAQUE_FALLIDO', 1, 1),
(17, '2023-12-06T04:30:00.733Z', 2, 1, 3, 'ATAQUE_EXITOSO', 5, 2),
(18, '2023-12-06T10:30:00.096Z', 1, 1, 1, 'BLOQUEO_EXITOSO', 1, 1),
(19, '2023-12-06T11:00:00.802Z', 2, 1, 3, 'PENALIZACION', 1, 2),
(20, '2023-12-06T11:00:00.726Z', 2, 1, 3, 'ADVERTENCIA', 1, 1),
(21, '2023-12-06T11:00:00.929Z', 2, 1, 3, 'DESCALIFICACION', 1, 5),
(22, '', 2, 1, 3, 'ADVERTENCIA', 1, 2),
(23, '2023-12-06T08:45:00.693Z', 2, 1, 3, 'ADVERTENCIA', 5, 3);