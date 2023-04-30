import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Text, Spacer, Button, Grid } from '@geist-ui/core';
import * as Icons from '@geist-ui/icons';

const Homepage = () => {
    const navigate = useNavigate();
  const buttonStyle = {
    width: '300px', // Set the width of the buttons
    height: '50px', // Set the height of the buttons
  };

  return (
    <Page>
      <Grid.Container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid>
            <Text h2>AutoGPT-GraphUI</Text>
            <Text h4>An AI Agent Visualization App based on AutoGPT</Text>
          <Spacer />
          <Grid.Container direction="column" gap={1}>
            <Grid>
              <Button onClick={() => navigate('/agents')}
                    auto iconRight={<Icons.Play />} type="success" size="large" style={buttonStyle}>
                Start
              </Button>
            </Grid>
            <Grid>
              <Button auto iconRight={<Icons.Database />} type="error" size="large" style={buttonStyle}>
                Memory
              </Button>
            </Grid>
            <Grid>
              <Button  onClick={() => navigate('/settings')} 
                    auto iconRight={<Icons.Settings />} type="secondary" size="large" style={buttonStyle}>
                Settings
              </Button>
            </Grid>
            <Grid>
              <Button auto iconRight={<Icons.Info />} type="secondary" size="large" style={buttonStyle}>
                About
              </Button>
            </Grid>
            <Grid>
              <Button auto iconRight={<Icons.Github />} type="secondary" size="large" style={buttonStyle}>
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
