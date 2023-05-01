import React, { useState } from 'react';
import { Input, Button, Page } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

const FontSelector = ({ changeFont }) => {

    const [fontLink, setFontLink] = useState('');

    const handleInputChange = (event) => {
        setFontLink(event.target.value);
    };

    const handleApplyFont = () => {
        changeFont(fontLink);
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
            }}
        >
            <Input
                value={fontLink}
                onChange={handleInputChange}
                placeholder="Enter Google Font link"
                width="100%"
                className='settings-input'
                style={{
                    color: '#fff',
                }}
            />
            <Button
                style={{
                    marginBottom: '10px',
                    maxWidth: '50px !important',
                    height: '36px',
                    backgroundColor: '#ff713c',
                    color: '#fff',
                    borderRadius: '0',
                }}
                onClick={handleApplyFont}>
                Apply Font
            </Button>
        </div>
    );
};

export default FontSelector;