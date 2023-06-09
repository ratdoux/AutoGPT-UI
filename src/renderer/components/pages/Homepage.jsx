import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Text, Spacer, Button, Grid } from '@geist-ui/core';
import * as Icons from '@geist-ui/icons';

const Homepage = () => {
  const navigate = useNavigate();
  const buttonStyle = {
    width: '300px', // Set the width of the buttons
    height: '50px', // Set the height of the buttons
    borderRadius: '0', // Set the border radius of the buttons
    border: 'none', // Set the border of the buttons
  };

  return (
    <Page>
      <Grid.Container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid>
          <Text
            style={{ color: "#b1e2e0" }} h2>
            AutoGPT-UI
          </Text>
          <Text
            style={{ color: "#ffd43c" }}
            h4>A UI wrapper for AutoGPT</Text>
          <Spacer />
          <Grid.Container direction="column" gap={1}>
            <Grid>
              <Button
                className='homepage-button'
                onClick={() => navigate('/chat')}
                auto iconRight={<Icons.Activity />} size="large"
                style={{ ...buttonStyle, backgroundColor: 'orange', color: '#fff' }}
              >
                Classic
              </Button>
            </Grid>
            <Grid>
              <Button onClick={() => navigate('/agents')}
                className='homepage-button'
                disabled
                auto iconRight={<Icons.Play />} size="large"
                style={{ ...buttonStyle, backgroundColor: '#00d969', color: '#fff' }}
              >
                Graph (WIP)
              </Button>
            </Grid>
            <Grid>
              <Button
                className='homepage-button'
                auto iconRight={<Icons.Database />} disabled type="error" size="large"
                style={{ ...buttonStyle, backgroundColor: '#6f95ff' }}
              >
                Memory (WIP)
              </Button>
            </Grid>
            <Grid>
              <Button
                className='homepage-button'
                onClick={() => navigate('/settings')}
                auto iconRight={<Icons.Settings />} type="secondary" size="large"
                style={{ ...buttonStyle, backgroundColor: "#e34f37" }}>
                Settings
              </Button>
            </Grid>
            <Grid>
              <Button
                className='homepage-button'
                auto iconRight={<Icons.Info />} type="secondary" size="large" style={buttonStyle}>
                About
              </Button>
            </Grid>
            <Grid>
              <Button
                className='homepage-button'
                auto iconRight={<Icons.Github />} type="secondary" size="large" style={buttonStyle}>
                Github
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Page>
  );
};

export default Homepage;
