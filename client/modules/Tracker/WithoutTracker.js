import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import styles from './styles.css';


class WithoutTracker extends Component {

  getDuration = () => {
    const fromHours = this.refs.fromHour.value;
    const fromMinutes = this.refs.fromMinute.value;
    const toHours = this.refs.toHour.value;
    const toMinutes = this.refs.toMinute.value;

    const start = moment(fromHours + ':' + fromMinutes, 'HH:mm');
    const end = moment(toHours + ':' + toMinutes, 'HH:mm');

    const duration = moment.utc(moment(end, 'HH:mm').diff(moment(start, 'HH:mm'))).format('HH:mm');
    return duration;
  }

  getTimeDate = () => {
    const date = new Date();
    const formattedDate = moment(date).format('DD-MMM-YY HH:mm');
    return formattedDate;
  };

  saveTracking = () => {
    const duration = this.getDuration();
    const time = this.getTimeDate();
    let description = this.refs.taskname.value;

    if (description) {
      this.props.bookTracking(description, duration, time);
      description = '';
    } else {
      console.log('It is null...');
    }
  }


  render() {
    return (
      <form onSubmit={this.saveTracking}>
        <label style={{ color: '#0084b4' }}>From</label>
        <div>
          <input
            placeholder="hour"
            ref="fromHour"
            className={styles.taskName}
          />
           {":"}
          <input
            placeholder="minute"
            ref="fromMinute"
            className={styles.taskName}
          />
        </div>
        <label style={{ color: '#0084b4' }}>To</label>
        <div>
          <input
            placeholder="hour"
            ref="toHour"
            className={styles.taskName}
          />
           {":"}
          <input
            placeholder="minute"
            ref="toMinute"
            className={styles.taskName}
          />
        </div>
        <input
          placeholder="task name"
          ref="taskname"
          className={styles.taskName}
        />
        <button className={styles.primaryButton}>Book</button>
      </form>
  );
  }

}

WithoutTracker.propTypes = {
  bookTracking: PropTypes.func,
};

export default WithoutTracker;
