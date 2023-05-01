import React, { useState } from 'react';
import { Textarea, Button, Page } from '@geist-ui/core';

const ParsingStringLists = ({ name, currentList, handleSettingsSave, title }) => {

    const [stringList, setStringList] = useState(currentList);
    const handleInputChange = (event, index) => {
        let newList = [...stringList];
        newList[index] = event.target.value;
        setStringList(newList);
    };

    const handleSave = () => {
        handleSettingsSave(JSON.stringify(stringList), name);
    };

    const handleRemove = (index) => {
        let newList = [...stringList];
        newList.splice(index, 1);
        setStringList(newList);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '1px solid #fff',
                padding: '1rem',
                minWidth: '60vw',
            }}
        >
            <h3
                style={{
                    color: '#fff',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                }}
            >{title}</h3>
            {stringList.map((item, index) => (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '0.2rem',
                    }}
                >
                    <p
                        style={{
                            color: '#fff',
                            paddingRight: '0.2rem',
                        }}
                    >{index}</p>
                    <Textarea
                        value={item}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Enter string"
                        width="100%"
                        className='string-input'
                        style={{
                            maxHeight: '40px',
                            minWidth: '45vw',
                        }}
                    />
                    <button
                        style={{
                            maxWidth: '5px !important',
                            height: '48px',
                            backgroundColor: '#ff713c',
                            color: '#fff',
                            borderRadius: '0',
                            borderTop: '2px solid white',
                            borderLeft: '2px solid white',
                            borderRight: '2px solid black',
                            borderBottom: '2px solid black',
                        }}
                        onClick={() => handleRemove(index)}
                    >
                        X
                    </button>
                </div>
            ))}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Button
                    style={{
                        marginBottom: '10px',
                        maxWidth: '50px !important',
                        height: '36px',
                        backgroundColor: '#ff713c',
                        color: '#fff',
                        borderRadius: '0',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderRight: '2px solid black',
                        borderBottom: '2px solid black',
                    }}
                    onClick={handleSave}
                >
                    Save
                </Button>
                <Button
                    style={{
                        marginBottom: '10px',
                        maxWidth: '20px !important',
                        height: '36px',
                        backgroundColor: '#ff713c',
                        color: '#fff',
                        borderRadius: '0',
                        borderTop: '2px solid white',
                        borderLeft: '2px solid white',
                        borderRight: '2px solid black',
                        borderBottom: '2px solid black',
                    }}
                    onClick={() => setStringList([...stringList, ''])}
                >
                    Add
                </Button>
            </div>
        </div>
    );
};

export default ParsingStringLists;