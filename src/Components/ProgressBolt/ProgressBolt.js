import { Icon } from '@material-ui/core';
import React from 'react';

import './anim.css';
export default function ProgressBolt({ fontSize }) {
  return (
    <Icon style={fontSize ? { fontSize } : { fontSize: '2rem' }} className="animatedBolt">
      offline_bolt
    </Icon>
  );
}
