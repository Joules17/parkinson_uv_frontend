import { render, screen, waitFor } from '@testing-library/react';
import PatientsPage from '../pages/patients/PatientsPage';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

describe('PatientsPage', () => {
    test('Renderiza el modulo de Paciente con un estado inicial', async () => {
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user: {
                given_name: "Lina",
                family_name: "Duque",
                nickname: "dlina1502",
                name: "Lina Duque",
                picture: "https://lh3.googleusercontent.com/a/ACg8ocLHQhTGrJ5BDGIv96mA2neXxyzmuqWlglrWeOeySqrD=s96-c",
                locale: "es-419",
                updated_at: "2023-11-13T16:04:32.306Z",
                email: "dlina1502@gmail.com",
                email_verified: true,
                sub: "google-oauth2|114369132100672370742"
            },
            domain: domain,
            clientId: clientId
        });
        render(
            <PatientsPage />
        );
        await waitFor(() => expect(screen.getByText('Cargando...')).toBeInTheDocument());
    });

    // test('renders patientsLIST as an array with objects after loading', async () => {
    //     useAuth0.mockReturnValue({
    //         isAuthenticated: true,
    //         user: {
    //             given_name: "Lina",
    //             family_name: "Duque",
    //             nickname: "dlina1502",
    //             name: "Lina Duque",
    //             picture: "https://lh3.googleusercontent.com/a/ACg8ocLHQhTGrJ5BDGIv96mA2neXxyzmuqWlglrWeOeySqrD=s96-c",
    //             locale: "es-419",
    //             updated_at: "2023-11-13T16:04:32.306Z",
    //             email: "dlina1502@gmail.com",
    //             email_verified: true,
    //             sub: "google-oauth2|114369132100672370742"
    //         },
    //         domain: domain,
    //         clientId: clientId
    //     });

    //     render(
    //         <PatientsPage />
    //     );

    //     // Espera a que el estado de carga cambie a "Usuarios"
    //     await waitFor(() => {
    //         expect(screen.getByText('Pacientes')).toBeInTheDocument();
    //     });

    // });

});

