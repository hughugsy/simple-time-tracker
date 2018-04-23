import React, { PropTypes, Component } from 'react';
import WithoutTracker from './WithoutTracker';
import TrackingList from './TrackingList';
import { connect } from 'react-redux';
import { addPostRequest, fetchPosts } from '../Post/PostActions';
import { getPosts } from '../Post/PostReducer';
import moment from 'moment';
import styles from './styles.css';

/*
const Button = styled.button`
  background: ${props => props.primary ? '#0084b4' : 'white'};
  color: ${props => props.primary ? 'white' : '#0084b4'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #0084b4;
  border-radius: 3px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #0084b4;
  background: #c0deed;
  border: none;
  border-radius: 3px;
`;

const Title = styled.h1`
  font-size: 1em;
  text-align: center;
  color: #0084b4;
`;


const Wrapper = styled.section`
  padding: 1em;
  background: #c0deed;
  width: 50%;
`;
*/

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      status: 'stopped',
      showList: true,
      showTracker: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  getTimeDate = () => {
    const date = new Date();
    const formattedDate = moment(date).format('DD-MMM-YY HH:mm');
    return formattedDate;
  };

  formatTime = (totalSeconds, forDatabase) => {
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    const format = forDatabase ? (hours + ':' + minutes) :
                    (hours + ':' + minutes + ':' + seconds);
    return format;
  };

  handleClick = () => {
    const { status } = this.state;
    if (status === 'paused' || status === 'stopped') {
      this.setState({ status: 'started' });
      this.startTimer();
    }
    if (status === 'started') {
      this.setState({ status: 'paused' });
      clearInterval(this.timer);
    }
  }


  bookTracking = () => {
    const { seconds } = this.state;
    let description = this.refs.description.value;
    const duration = this.formatTime(seconds, true);
    const time = this.getTimeDate();
    if (description) {
      this.props.dispatch(addPostRequest({ description, duration, time }));
      description = '';
    } else {
      console.log('It is null...');
    }

    this.setState({
      status: 'stopped',
      seconds: 0,
    });
  }


  bookWithoutTracking = (description, duration, time) => {
    this.props.dispatch(addPostRequest({ description, duration, time }));
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const newCount = this.state.seconds + 1;
      this.setState({ seconds: newCount });
    }, 1000);
  };

  buttonText = () => {
    let text;
    const { status } = this.state;
    if (status === 'paused') {
      text = 'Resume';
    }
    if (status === 'started') {
      text = 'Pause';
    }
    if (status === 'stopped') {
      text = 'Start';
    }
    return text;
  }

  showList = () => {
    this.setState({ showList: true });
  }

  showForm = () => {
    this.setState({ showList: false });
  }

  withTracker = () => {
    this.setState({ showTracker: true });
  }

  noTracker = () => {
    this.setState({ showTracker: false });
  }

  render() {
    const tracker = this.state.showTracker ? (
      <div>
        <section className={styles.timeSection}>
          <h1 className={styles.timeDisplay}>
          {this.formatTime(this.state.seconds, false)}
          </h1>
        </section>
        <button
          onClick={this.handleClick}
          className={styles.primaryButton}
        >
          {this.buttonText()}
        </button>
        <form onSubmit={this.bookTracking}>
          <input
            placeholder="task name"
            ref="description"
            className={styles.taskName}
          />
          <button className={styles.primaryButton}>Book</button>
        </form>
      </div>
    ) : (<WithoutTracker bookTracking={this.bookWithoutTracking} />);

    const content = this.state.showList ? (<TrackingList />) : (
      <div>
        {tracker}
        <button onClick={this.withTracker} className={styles.navButton} >
          With Tracker
        </button>
        <button onClick={this.noTracker} className={styles.navButton}>
          Without Tracker
        </button>
      </div>
    );
    return (
      <div>
        <div>
          <button onClick={this.showList} className={styles.navButton}>
            Tracking List
          </button>
          <button onClick={this.showForm} className={styles.navButton}>
            Add New Tracking
          </button>
        </div>
        {content}
      </div>
    );
  }
}

Home.need = [() => { return fetchPosts(); }];

function mapStateToProps(state) {
  return {
    posts: getPosts(state),
  };
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};


export default connect(mapStateToProps)(Home);
