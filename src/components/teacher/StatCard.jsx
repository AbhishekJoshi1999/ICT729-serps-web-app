import { Box, Paper, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const cards = [
  { title: 'Total Students', value: 150, icon: <PeopleAltIcon fontSize="large" /> },
  { title: 'Course Completion', value: '75%', icon: <SchoolIcon fontSize="large" /> },
  { title: 'Engagement', value: '76%', icon: <EmojiEventsIcon fontSize="large" /> },
];

const StatCards = () => {
  return (
    <Box display="flex" gap={3} mt={2} flexWrap="wrap">
      {cards.map((card, index) => (
        <Paper key={index} elevation={3} sx={{ p: 3, flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: 2 }}>
          {card.icon}
          <Box>
            <Typography variant="subtitle2">{card.title}</Typography>
            <Typography variant="h6" fontWeight="bold">{card.value}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default StatCards;
