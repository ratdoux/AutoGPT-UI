import React, { useState } from 'react';
import { Input, Button } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';

const Settings = ({ changeFont }) => {
    const [fontLink, setFontLink] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setFontLink(event.target.value);
    };

    const handleApplyFont = () => {
        changeFont(fontLink);
    };

    return (
        <div>
            <Button onClick={() => navigate('/')}>
                Home
            </Button>
            <h3>Settings</h3>
            <Input
                value={fontLink}
                onChange={handleInputChange}
                placeholder="Enter Google Font link"
                width="100%"
            />
            <Button onClick={handleApplyFont}>Apply Font</Button>
        </div>
    );
};

export default Settings;
