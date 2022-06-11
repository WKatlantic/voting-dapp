import * as React from 'react';
import { useState, useContext } from 'react';
import type { NextPage } from 'next';
import { Container, Grid, Box, Typography, TextField,Button} from '@mui/material';
import { makeStyles } from "@mui/styles";
import { useYam } from '../hooks';
import { Web3ModalContext } from '../contexts';

const useStyles = makeStyles(() => ({
  customInput: {
    color:'black',
    width:'100%',
    marginTop:'2%',
  },
  dashContainerStyle: {
    marginTop:'100px',
    marginLeft:'5%',
  },
  calcBoxStyle: {
    padding:'5%',
    height:'100%',
    borderRadius: '10px',
    background: 'linear-gradient(to bottom, rgba(78, 14, 238, 0.25), rgba(123,122, 231, 0.25))',
    marginBottom: '10%',
    marginLeft:'5%',
  },
}));

const Home: NextPage = () => {
  const classes = useStyles(); 
  const { account } = useContext(Web3ModalContext);
  const [title, setTitle] = useState<string>("");
  const [options, setOptions] = useState<string[]>([""]);
  const [optionCounts, setOptionCounts] = useState<number>(0);
  const [autofocus, setAutofocus] = useState<string | number>("title");
  const yamClient = useYam();

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleOptionAdd = () => {
    if(options.length > 0) {
      if(options[optionCounts].length == 0) {
        alert("Please set exact option value!");
      } else {
        setOptionCounts(optionCounts + 1);
        setOptions([...options, ""]);
        setAutofocus(options.length);
      }
    }
  };

  const handleOptionDelete = (_index: number) => {
    if(optionCounts > 0) {
      setOptionCounts(optionCounts - 1);
      setOptions(options.filter((value, index) => index !== _index));
    }
  };

  const handleCreateVotingPol = async() => {
      if(title.length >=1 && options[optionCounts].length >=1 ) {
        if(yamClient != undefined) {
           await yamClient.contracts.contractsMap['VotingFactory'].methods.newVotingPoll(title, options).send({from:account});
        }
      } else {
        alert("Please set exact Title value!");
      }
  }

  const handleOptionChange = (_value: string, _index: number) => {
    setOptions(
      options.map((value, index) => (index === _index ? _value : value))
    );
  };

  return (
    <Container className={classes.dashContainerStyle}>
      <Grid container spacing={6}>

      <Grid item xs={12} sx={{mb:5,}}>
          <Typography textAlign={'center'} variant='subtitle2'>Create Voting</Typography>
      </Grid>

      <Grid container spacing={6}>
        <Grid lg={2} ml={0} xs={0}>
        </Grid>

        <Grid lg={8} md={12} xs={12} item>  
          <Box className={classes.calcBoxStyle}>
            <Grid item sx={{mb:3,}}>
              <Typography>Voting Title:</Typography>
              <TextField className={classes.customInput}
                value={title}
                onChange={(e:any) => handleTitleChange(e.target.value)}
                autoFocus={autofocus === "title"}
              />
            </Grid>
            <br/>
            <Typography>Input Number of Voting Options:</Typography>

            <Grid lg={12} md={12} xs={12} item>
              {options.map((value, index) => (
                <Grid container key={index+1}>
                  <Grid xs={11}>
                    <TextField  className={classes.customInput}
                    onChange={(e:any) => handleOptionChange(e.target.value, index)}
                    autoFocus={index === autofocus}
                    variant="standard"
                    />
                  </Grid>
                  <Grid xs={1} sx={{bt:3,}}>
                    <Typography onClick={() => handleOptionDelete(index)}>X</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid container>
              <Grid lg={6}>
                <Button sx={{width: '90%', mt:2,}}
                onClick={handleOptionAdd}
                >+ Add New Option</Button>
              </Grid>
              <Grid lg={6}>
                <Button sx={{width: '90%', mt:2,}}
                onClick={handleCreateVotingPol}
                >Create VotingPoll</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        </Grid>

       <Grid lg={2} ml={0} xs={0}>
      </Grid>

    </Grid>
    </Container>
  );
};

export default Home;