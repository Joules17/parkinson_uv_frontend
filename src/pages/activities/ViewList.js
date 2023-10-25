import { useState, useEffect } from 'react';

// mui
import { Button, Typography, Box, Avatar } from '@mui/material';

// project import
import ChargingCard from 'components/ChargingCard';

// assets
import { DownOutlined, UpOutlined } from '@ant-design/icons';

// api callbacks
import { useExternalApi } from 'hooks/listGamesResponse';

export default function ViewList({ listGames, name_list, userType }) {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const toggleInfoVisible = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    if (listGames === null) {
        return <ChargingCard />;
    }
    return (
        <div>
            <Button onClick={toggleInfoVisible} variant="outlined" fullWidth endIcon={isInfoVisible ? <UpOutlined /> : <DownOutlined />}>
                {name_list}
            </Button>
            {isInfoVisible && (
                <div>
                    {listGames.games.map((item, index) => (
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between" // Distribute items along the main axis
                            alignItems="center"
                            sx={{
                                padding: 1,
                                borderBottom: '1px solid #e0e0e0',
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                <Avatar alt={item.name} src={item.game_picture} sx={{ mr: '1rem' }} />
                                <div>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary"> {item.id_type} </Typography>
                                    {userType == "doctor" && (
                                        //Poner aquí los logs 
                                        <Typography variant="body2" color="text.secondary"> {item.id_type} </Typography>
                                    )}
                                </div>
                            </Box>
                            {item.setting && item.setting.rondas !== undefined && (
                                <Typography variant="body2" color="text.secondary">
                                    Rondas: {item.setting.rondas}
                                </Typography>
                            )}
                        </Box>
                    ))}
                </div>
            )}
        </div>
    );
};