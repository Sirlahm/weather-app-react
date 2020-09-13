import React from 'react'
import './forcast.scss'
import {connect} from 'react-redux'
import ForecastItem from '../forecast-item/forecast-item'
import ReactPaginate from 'react-paginate';



const WEATHER_KEY= process.env.REACT_APP_WEATHER_API_KEY;
class ForeCast extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        offset: 0,
        items:[],
        perPage: 10,
        currentPage: 0,
        slice: []
      }
     };
      handlePageClick = (e) => {
       const selectedPage = e.selected;
       const offset = selectedPage * this.state.perPage;
 
       this.setState({
           currentPage: selectedPage,
           offset: offset
       }, () => {
           this.receivedData()
       });
     }
    receivedData= () => {
       if(this.state.items.length>1) {
         this.setState({
           pageCount: Math.ceil(this.state.items.length / this.state.perPage),
           slice : this.state.items.slice(this.state.offset, this.state.offset + this.state.perPage)
 
          
       })
       }
             
         };
 
   
   componentWillMount() {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.props.searchItem}&appid=${WEATHER_KEY}`)
      .then(response => response.json())
      .then(resJson => this.setState({items:resJson.list}, () => {this.receivedData()}))
      
   }
   
  
 render() {
 
   
  
   
   return (
     
     
     
    <div className='forecast' >
    <h1 className='forecast__head'> WEATHER FORECAST FOR 5 DAYS WITHIN 3 HOURS INTERVAL IN {this.props.searchState} </h1>
{this.state.slice.map(item => <ForecastItem key={item.dt} item={item}/> ) }

{this.state.items.length>1?<ReactPaginate
             previousLabel={"prev"}
             nextLabel={"next"}
             breakLabel={"..."}
             breakClassName={"break-me"}
             pageCount={this.state.pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={this.handlePageClick}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"}/>: <h1 className='util'>PROCESSING...</h1>}
    </div>   
       
   )
 }
 }


const mapStateToProps = ({search:{searchItem,searchState}}) => ({
    searchItem,
    searchState
})


export default connect(mapStateToProps)(ForeCast)