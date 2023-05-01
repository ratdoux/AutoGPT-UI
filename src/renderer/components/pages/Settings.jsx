import React, { useState, useEffect } from 'react';
import { Button, Page } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import FontSelector from "../settings/FontSelector";
import ParsingStringLists from '../settings/ParsingStringLists';
import { infoStringList, atomicActions, returnList, returnListNextLine, colorTable } from '../utils/ParsingSettings';
const Settings = ({ changeFont, settings, handleSaveSettings, handleInputChange }) => {
    const navigate = useNavigate();
    const [parsingSettings, setParsingSettings] = useState({});
    const [render, setRender] = useState(false);
    function parseJSON(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return str;
        }
    }
    function parseSettings(settings) {
        return settings.reduce((accumulator, setting) => {
            const [key, value] = setting.split('=');
            accumulator[key] = parseJSON(value);
            return accumulator;
        }, {});
    }

    useEffect(() => {
        setParsingSettings(parseSettings(settings));
        setRender(true);
    }, []);

    console.log(parsingSettings.returnListNextLine ?? returnListNextLine)
    return (
        <Page
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.1rem',
                }}
            >
                <h3
                    style={{
                        color: '#fff',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        paddingBottom: '0',
                        marginBottom: '0',
                    }}
                >Settings</h3>
                <Button
                    style={{
                        marginBottom: '0.4rem',
                        backgroundColor: '#ff713c',
                        color: '#fff',
                        borderRadius: '0',
                    }}
                    className='home-button'
                    onClick={() => navigate('/')}>
                    Home
                </Button>
            </div>
            <div
                style={{
                    overflowY: 'scroll',
                    maxHeight: '90vh', // or any other value you prefer
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FontSelector changeFont={changeFont} />
                {render &&
                    <>
                        <ParsingStringLists
                            name={'infoStringList'}
                            title={'Info String List'}
                            handleSettingsSave={handleInputChange}
                            currentList={parsingSettings.infoStringList ?? infoStringList}
                        />
                        <ParsingStringLists
                            name={'atomicActions'}
                            title={'Atomic Actions'}
                            handleSettingsSave={handleInputChange}
                            currentList={parsingSettings.atomicActions ?? atomicActions}
                        />
                        <ParsingStringLists
                            name={'returnList'}
                            title={'Return List'}
                            handleSettingsSave={handleInputChange}
                            currentList={parsingSettings.returnList ?? returnList}
                        />
                        <ParsingStringLists
                            name={'returnListNextLine'}
                            title={'Return List Next Line'}
                            handleSettingsSave={handleInputChange}
                            currentList={parsingSettings.returnListNextLine ?? returnListNextLine}
                        />
                    </>
                }
            </div>
        </Page>
    );
};

export default Settings;
