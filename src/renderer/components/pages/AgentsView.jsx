import React, { useState } from 'react';
import { Button, Drawer, Page, Grid } from '@geist-ui/core';
import { ArrowLeft, Menu } from '@geist-ui/icons';
import BubbleForceDirectedTree from '../d3/BubbleForceDirectedTree';
const AgentsView = () => {
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  const data = {
    name: "root",
    children: [
      {name: "child #1"},
      {
        name: "child #2",
        children: [
          {name: "grandchild #1"},
          {name: "grandchild #2"},
          {name: "grandchild #3"}
        ]
      }
    ]
  };

  return (
    <div>
              <BubbleForceDirectedTree data={data} width={600} height={600} />

    {/* <Page>
      <Grid.Container
        alignItems="center"
        justify="flex-end"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Grid>
          <Button auto icon={<ArrowLeft/>} scale={1 / 2} onClick={toggleDrawer} />
        </Grid>
      </Grid.Container>
      <div>
      </div>
      <Drawer visible={drawerState} onClose={toggleDrawer} placement="right">
        <Drawer.Title>Drawer</Drawer.Title>
        <Drawer.Subtitle>This is a drawer</Drawer.Subtitle>
        <Drawer.Content>
          <p>Some content contained within the drawer.</p>
        </Drawer.Content>
      </Drawer>
    </Page> */}
    </div>

  );
};

export default AgentsView;
