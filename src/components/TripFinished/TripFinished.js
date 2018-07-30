import React from 'react';
import { connect } from 'dva';
import styles from './TripFinished.css'
class TripFinished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activatedStars:0,
        starViewed:false,
        starRated:false,
        stars:[1,2,3,4,5]
    }
  }
  componentDidMount(){
  }
  componentDidUpdate(){
      if(this.state.activatedStars>0&&!this.state.starViewed){
          setTimeout(()=>this.setState({starViewed:true}),10)
      }
      if(this.state.starViewed&&!this.state.starRated){
        setTimeout(()=>this.setState({starRated:true}),1000)
        setTimeout(()=>{this.props.dispatch({
            type:'navigator/save',
            payload:{
                returnInitialStateTriggered:true,
                tripFinishedTriggered:false
            }
          })}, 2000)
      }
  }
  componentWillUnmount(){
  }
  
  render(){
    return (
      <div>
          <div className={styles.bottom__background__mask}></div>
          <div className={styles.bottom__container}>
            <div className={styles.bottom__rating__card}>
            {(()=>{
                if(!this.state.starRated){ 
                    return(
                    <div>
                        <div className={styles.bottom__rating__title}>
                        请对此次行程进行评价
                        </div>
                        <div className={styles.bottom__star__box}>

                        {(()=>{
                            return this.state.stars.map((value)=>
                            <div
                            onClick={()=>{
                                this.setState({activatedStars:value},()=>{
                                    
                                })
                            }} 
                            className={this.state.activatedStars>=value?styles.star__activated:styles.star__deactive}>
                            </div>)
                        })()}
                        </div>    
                    </div>
                    )
                } else return(
                    <div className={styles.thank__message}>
                        感谢您的评价
                    </div>
                )
            })()}
            </div>
          </div>
       </div> 
    );
  }

};

TripFinished.propTypes = {
  
};

function mapStateToProps(state) {
  return this.state
}

export default connect(mapStateToProps)(TripFinished);
