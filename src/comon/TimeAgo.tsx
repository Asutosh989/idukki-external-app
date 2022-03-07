import React from 'react';
import { Tooltip, Text } from 'sha-el-design';
import { formatDistance } from 'date-fns';
import { TooltipPlacement } from 'sha-el-design/lib/components/Tooltip/Tooltip';

export const getTimeAgo = (unixDate: number) => {
  return formatDistance(new Date(unixDate), new Date());
};

export const TimeAgo: React.FC<{ children: number; placement?: TooltipPlacement }> = (props) => {
  return (
    <Text color="light" variant="label">
      {getTimeAgo(props.children)} ago
    </Text>
  );
};
