import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Grid, Typography, Box, Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from "@mui/styles";
import { useYam } from '../hooks';
import { Web3ModalContext } from '../contexts';
import { List, ListItem } from '@mui/material';

const useStyles = makeStyles(() => ({
  customBoxStyle: {
    background: 'linear-gradient(to bottom, rgba(78, 14, 238, 0.25), rgba(123,122, 231, 0.25))',
    padding: '7%',
    height: '100%',
  },
  votingPollStyle: {
    padding: '2%',
    borderRadius: '10px',
    marginTop:'2%',
    marginBottom:'2%',
  },
  titleStyle: {
    fontSize:'20px',
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
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [spinStatus, setSpinStatus] = useState<boolean>(true);
  const [multiCheck, setMultiCheck] = useState<boolean>(false);
  const [titles, setTitles] = useState<string[]>([""]);
  const [options, setOptions] = useState<string[]>([""]);
  const yamClient = useYam();
  const router = useRouter();

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
    if(votingPolls.length > 0) {
      if(yamClient != undefined) {
        setSpinStatus(true);
        const pollContract = yamClient.contracts.contractsMap['VotingPoll'];
        pollContract.options.address = votingPolls[id];
        const _options = await pollContract.methods.getOptions().call();
        const _multi = await pollContract.methods.getMultiCheck(account).call();
        // setMultiCheck((_multi > 0));
        if(_multi > 0) {
          setMultiCheck(true);
        } else {
          setMultiCheck(false);
        }
        setSelectedTitle(titles[id]);
        setSelectedPoll(pollContract);
        setOptions(_options);
        setSpinStatus(false);
      }
    }
  }

  const handleVote = async (id:number) => {
    if(yamClient != undefined) {
      const pollContract = yamClient.contracts.contractsMap['VotingPoll'];
      pollContract.options.address = votingPolls[selectedPoll];
      pollContract.methods.voting(id).send({from:account})
      .on('transactionHash', function(hash:any){
        setSpinStatus(true);
      })
      .on('receipt', function(receipt:any){
        setSpinStatus(false);
      })
      .on('confirmation', function(confirmationNumber:any, receipt:any){
        return ;
      })
    }
  }

  return (
    <Container className={classes.rewardContainerStyle}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box className={classes.customBoxStyle}>
            <Grid item>
              <Typography variant="h5">Select VotingPoll</Typography>
            </Grid>
            <Grid item>
              <List>
                {
                  titles ? (
                    titles.map((value, index) => {
                      return (
                        <Grid key={index}>
                          <ListItem button onClick={() => selectVotingPoll(index)}>
                            <Button>{titles[index]}</Button>
                          </ListItem>
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
            <Box className={classes.customBoxStyle}>
              <Grid item sx={{mb:2}}>
                <Typography variant="h5" >Vote</Typography>
              </Grid>
              <Grid item sx={{mb:2}}>
                <Grid container>
                  {
                  spinStatus ? (
                    !selectedTitle ? (
                      <></>
                    ) : (
                      <CircularProgress/>
                    )
                  ) : (
                    <Grid xs={12}>
                      <Grid item>
                        <Grid>
                          <Typography  variant="h5">{selectedTitle}</Typography>
                        </Grid>
                        <Grid>
                          <Button variant="outlined" disabled={!multiCheck}>
                            <Link href="/voteresult" passHref>
                              <ListItem key="voutresult" selected={router.asPath == '/voteresult'}>
                                {'See Result'}
                              </ListItem>
                            </Link>
                          </Button>
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
                                    <Button variant="outlined" onClick={() => handleVote(index)}>✓</Button>
                                  </Button>
                                </Grid>
                              </Grid>
                            </ListItem>
                          </Box>
                      )})
                      }
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
      </Grid>
    </Container>
  );
};

export default Vote;
