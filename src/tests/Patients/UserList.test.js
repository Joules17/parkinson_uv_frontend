import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import UserList from '../../pages/patients/components/UserList';
import { useAuth0 } from '@auth0/auth0-react';

// Mockear dependencias o importaciones según sea necesario
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

jest.mock('../../hooks/therapistResponse', () => ({
  useExternalApi: () => ({
    getTherapistPatients: jest.fn(),
  }),
}));

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

describe('UserList', () => {
  it('Renderiza el componente UserList con una lista de pacientes', async () => {
    const userList = [
      {
        id_type: 2,
        name: "Marcela",
        lastname: "Duque",
        email: "marceladuque2001@hotmail.com",
        cell: "3108645578",
        age: "1967-05-09",
        gender: "femenino",
        id_parkinson_phase_id: 1,
        id_therapist_id: "google-oauth2|114369132100672370742",
        user_id: "auth0|6519e96507e123aeb1b5c948",
        document_id: 119315519,
        document_type: "C.C.",
        user_picture: "https://s.gravatar.com/avatar/b60feaec1b3269602c1d48ad3f34afed?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png",
        user_status: true,
        parkinson_phase: "No asignado"
      }
    ];

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

    // Renderizar el componente UserList
    render(<UserList list={userList} loading="Cargando..." />);

    // Asegurarse de que los elementos esperados estén presentes en la pantalla
    expect(screen.getByText('Marcela Duque')).toBeInTheDocument();

  });
});
