import { render, screen, waitFor } from '@testing-library/react';
import Games from '../../pages/games/Games';
import { Provider } from 'react-redux';
import { store } from 'store';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

describe('GamesPage', () => {
    test('Games page renders correctly', async () => {
        const initListGames = [{id:12,name:"Letras Marinas",description:"temporal",game_picture:"https://i.imgur.com/3ZbWM1a_d.webp?maxwidth=760&fidelity=grand",id_type_id:3,type:"Lenguaje"},{id:13,name:"Burbujas de Memoria",description:"temporal",game_picture:"https://i.imgur.com/dmUGi1Y_d.webp?maxwidth=760&fidelity=grand",id_type_id:1,type:"Memoria"},{id:14,name:"Fotografias Misteriosas",description:"temporal",game_picture:"https://i.imgur.com/ySz32Jk_d.webp?maxwidth=760&fidelity=grand",id_type_id:1,type:"Memoria"}]
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
        render(<Provider store={store}><Games initListGames={initListGames} /></Provider>);
        expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText(/Letras Marinas/i)).toBeNull();
        });

    });
});