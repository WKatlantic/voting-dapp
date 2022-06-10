import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Container, Grid, Typography, Box, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from "@mui/styles";
import { useYam } from '../hooks';
import { Web3ModalContext } from '../contexts';
import { List, ListItem } from '@mui/material';
import {MdOutlineHowToVote} from 'react-icons/Md';

// import { handleBreakpoints } from '@mui/system';
const useStyles = makeStyles(() => ({
  customBoxStyle: {
    backgroundColor: 'rgba(47, 19, 74, 0.25)',
    padding: '7%',
    borderRadius: '10px',
    height: '100%',
  },
  votingPollStyle: {
    backgroundColor: 'rgba(47, 19, 74, 0.25)',
    padding: '2%',
    borderRadius: '10px',
    marginTop:'2%',
    marginBottom:'2%',
  },
  titleStyle: {
    fontSize:'30px',
    lineHeight:'40px',
    wordWrap:'break-word',
    marginBottom:'20px',
  },
  subContentStyle: {
    fontSize:'20px',
    wordWrap:'break-word',
  },
  rewardContainerStyle: {
    marginTop:'100px',
    marginLeft:'5%',
    wordWrap:'break-word',
  },
  listItemStyle: {
    fontSize:'50px',
    paddingLeft: 2,
    justifyContent:'space-between',
    display:'flex',
  },
  itemBoxStyle: {
    backgroundColor: 'rgba(47, 19, 74, 0.25)',
    padding: '2%',
    margin: '2%',
    borderRadius: '10px',
  },
  finishButtonStyle: {
    borderRadius:'20px',
  },
  spinerStyle: {
    width:'200px',
    height:'200px',
  },
}));

const Vote: NextPage = () => {
  const classes = useStyles();
  const { account } = useContext(Web3ModalContext);
  const [votingPolls, setVotingPolls] = useState<string[]>([""]);
  const [selectedPoll, setSelectedPoll] = useState<any>();
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
  const [selectedOwner, setSelectedOwner] = useState<any>();
  const [selectedResults, setselectedResults] = useState<number[]>();
  const [titles, setTitles] = useState<string[]>([""]);
  const [options, setOptions] = useState<string[]>([""]);

  const yamClient = useYam();

  useEffect(() => {
    const getVottingPolls = async () => {
      try {
        if(yamClient != undefined) {
          const _votingPolls = await yamClient.contracts.contractsMap['VotingFactory'].methods.getAllPolls().call(); //Selling
          const _titles = await yamClient.contracts.contractsMap['VotingFactory'].methods.getTitles().call(); //Selling
          setVotingPolls(_votingPolls);
          setTitles(_titles);
          const pollContract = yamClient.contracts.contractsMap['VotingPoll'];
          for(let i = 0; i < _votingPolls.length ; i++) {
            pollContract.options.address = votingPolls[i];
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVottingPolls();
  }, [yamClient]);

  const selectVotingPoll = async (id:any) => {
    if(yamClient != undefined) {
      const pollContract = yamClient.contracts.contractsMap['VotingPoll'];
      pollContract.options.address = votingPolls[id];
      const _options = await pollContract.methods.getOptions().call();
      const _status = await pollContract.methods.getStatus().call();
      const _owner = await pollContract.methods.getOwner().call();
      setSelectedPoll(pollContract);
      setOptions(_options);
      setSelectedOwner(_owner);
      setSelectedStatus(_status);
      const _results: number[] = new Array(_options.length);
      for (let i = 0; i < options.length; i++) {
        const _result = await pollContract.methods.getResult(i).call();
          _results[i] = _result;
      }
      setselectedResults(_results);
    }
    setSelectedTitle(titles[id]);
  }

  const isOwner = () => {
    return (account==selectedOwner);
  }

  const handleFinishVote = async () => {
    if(yamClient != undefined) {
      await selectedPoll.methods.pauseVoting().send({from:account});
    }
  }

  const handleVote = async (id:number) => {
    if(yamClient != undefined) {
      const pollContract = yamClient.contracts.contractsMap['VotingPoll'];
      pollContract.options.address = votingPolls[selectedPoll];
      await pollContract.methods.voting(id).send({from:account});
    }
  }

  return (
    <Container className={classes.rewardContainerStyle}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box className={classes.customBoxStyle}>
            <Grid item sx={{mb:3}}>
              <Typography className={classes.titleStyle} variant="subtitle2">Select VotingPoll</Typography>
            </Grid>
            <Grid item>
              <List>
                {
                  titles ? (
                    titles.map((value, index) => {
                      return (
                        <Grid key={index}>
                          <Box className={classes.itemBoxStyle}>
                            <ListItem  button onClick={() => selectVotingPoll(index)}>
                                {titles[index]}
                            </ListItem>
                          </Box>
                        </Grid>
                      )
                    })
                  ) : (
                    <CircularProgress/>
                  )
                }
              </List>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
        {
          selectedStatus ? (
            <Box className={classes.customBoxStyle}>
              <Grid item sx={{mb:2}}>
                <Typography className={classes.titleStyle} variant="subtitle2" >Vote</Typography>
              </Grid>
              {
                selectedTitle ? (
                  <Grid item sx={{mb:2}}>
                    <Grid container>
                      <Grid xs={9}>
                        <Typography className={classes.titleStyle} >{selectedTitle}</Typography>
                      </Grid>
                      <Grid xs={3}>
                        <Button className={classes.finishButtonStyle} disabled={!isOwner()} onClick={ () => handleFinishVote() }> Finish </Button>
                      </Grid>
                    </Grid>
                    {
                        options.map((value, index) => {
                        return (
                          <Box className={classes.itemBoxStyle}  key={index}>
                            <ListItem>
                              <Grid container>
                                <Grid xs={10} md={10} lg={10} item>
                                  <Typography
                                  >{options[index]}</Typography>
                                </Grid>
                                <Grid xs={1} md={1} lg={1} item>
                                  <Button>
                                    <MdOutlineHowToVote onClick={() => handleVote(index)}/>
                                  </Button>
                                </Grid>
                              </Grid>
                            </ListItem>
                          </Box>
                      )})
                    }
                  </Grid>
                ) : (
                  <CircularProgress/>
                )}
            </Box>
          ) : (
            <Box className={classes.customBoxStyle}>
              <Grid item sx={{mb:2}}>
                  <Typography className={classes.titleStyle} variant="subtitle2" >Vote</Typography>
              </Grid>
              <Grid item>
              {
                selectedTitle ? (
                  <Grid item sx={{mb:2}}>
                  <Typography className={classes.titleStyle} >{selectedTitle} {"(finished)"}</Typography>
                  {
                      options.map((value, index) => {
                      return (
                        <Box className={classes.itemBoxStyle} key={index}>
                          <Grid container>
                              <Grid xs={10}>
                                <Typography
                                >{options[index]}</Typography>
                              </Grid>
                              <Grid xs={2}>
                                <Typography>{" + "} {selectedResults ? (selectedResults[index]) : (0) }</Typography>
                              </Grid>
                          </Grid>
                        </Box>
                    )})
                  }
                  </Grid>
                ) : (
                  <CircularProgress/>
                )}
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Vote;