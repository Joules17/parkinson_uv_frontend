import { render, screen, waitFor } from '@testing-library/react';
import Library from '../../pages/library/Library';
import { Provider } from 'react-redux';
import { store } from 'store';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID



describe('LibraryPage', () => {
    test('Library renders correctly', async () => {
        const initList = [
            {
                id: 6,
                name: "Lista ejemplo 4",
                id_therapist: "google-oauth2|114369132100672370742",
                games: [
                    {
                        id: 2,
                        id_type: "Memoria",
                        name: "Recuerda y Encuentra",
                        description: "Actividad que consiste en ejercitar la memoria por medio de recordar cual fue el ultimo objeto anterior para así, seleccionar al nuevo objeto en un escenario",
                        game_picture: "https://i.imgur.com/iDLpcw5_d.webp?maxwidth=760&fidelity=grand",
                        setting: {
                            field1: "value1",
                            field2: "value2"
                        },
                        id_game_list: 16
                    },
                ]
            }
        ]
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
        render(<Provider store={store}><Library initList={initList} /></Provider>);
        expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText(/Lista ejemplo 4/i)).toBeNull();
        });

    });
});
