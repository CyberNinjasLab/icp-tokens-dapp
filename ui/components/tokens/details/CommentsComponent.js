import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, Typography, CircularProgress, Divider, IconButton, Avatar } from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';
import { useComments } from '../../../../contexts/comments/CommentsContext';
import TimeAgo from 'react-timeago'

const CommentsComponent = () => {
  const { comments, newComment, setNewComment, loading, handleAddComment, lastCommentElementRef } = useComments();
  const [showComments, setShowComments] = useState(false);

  const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    margin: 'auto',
    mt: 1,
    bgcolor: '#28abe508',
    border: '1px solid',
    borderRadius: '4px',
    mx: 'auto',
  };

  const listStyles = {
    flexGrow: 1,
    py: 1,
    px: { xs: 0, md: 1 },
    width: '100%',
    border: 'none',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    mt: 2,
    p: 2,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box sx={boxStyles} className='border border-[#D3D3D3] dark:border-[#555]'>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6">Comments</Typography>
        <IconButton onClick={() => setShowComments(!showComments)}>
          <CommentIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>{showComments ? 'Hide Comments' : 'Show Comments'}</Typography>
        </IconButton>
      </Box>
      {showComments && (
        <List sx={listStyles}>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <ListItem ref={index === comments.length - 1 ? lastCommentElementRef : null}>
                <Box>
                  <Box display='flex' flexDirection='row' alignItems="baseline" justifyContent='space-between'>
                    <Box display='flex' flexDirection='row' alignItems="center">
                      <Avatar alt='logo' src='https://e3qlq-3iaaa-aaaag-ahkta-cai.icp0.io/icptokens-logo-white.svg' sx={{ width: 24, height: 24, mr: 1 }}/>
                    <Typography variant="subtitle1" fontWeight="bold">
                    {comment.author}
                  </Typography>
                    </Box>
                  <Typography fontStyle='italic' fontSize={12}><TimeAgo date={comment.date} /></Typography>
                  </Box>
                  <Typography variant="body2">
                    {comment.text}
                  </Typography>
                </Box>
              </ListItem>
              {index < comments.length - 1 && <Divider variant="middle" component="li" className="pt-4" />}
            </React.Fragment>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </List>
      )}
      <Box
        component="form"
        sx={formStyles}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Add a comment..."
          value={newComment}
          multiline
          minRows={3}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Post Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsComponent;
