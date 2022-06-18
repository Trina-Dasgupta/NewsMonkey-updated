import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  // articles=[
     
  //     {
  //     "source": {
  //     "id": "techcrunch",
  //     "name": "TechCrunch"
  //     },
  //     "author": "Manish Singh",
  //     "title": "Amazon said to pull out of IPL cricket streaming bidding",
  //     "description": "Amazon won’t be bidding for the IPL media rights for the year 2023 to 2027, a person familiar with the matter said, leaving the hotly contested streaming auction to Disney and Reliance. The e-commerce giant was one of the several tech giants that had been pre…",
  //     "url": "https://techcrunch.com/2022/06/10/amazon-said-to-pull-out-of-ipl-cricket-streaming-bidding/",
  //     "urlToImage": "https://techcrunch.com/wp-content/uploads/2019/05/GettyImages-1148622191.jpg?w=552",
  //     "publishedAt": "2022-06-10T08:16:59Z",
  //     "content": "Amazon won’t be bidding for the IPL media rights for the year 2023 to 2027, a person familiar with the matter said, leaving the hotly contested streaming auction to Disney and Reliance. The e-commerc… [+1241 chars]"
  //     },
  //     {
  //     "source": {
  //     "id": "bbc-sport",
  //     "name": "BBC Sport"
  //     },
  //     "author": "BBC Sport",
  //     "title": "Shane Warne memorial - watch & follow updates",
  //     "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
  //     "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
  //     "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
  //     "publishedAt": "2022-03-30T08:22:26.498888Z",
  //     "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
  //     },
  //     {
  //     "source": {
  //     "id": "espn-cric-info",
  //     "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //     },
  //     {
  //     "source": {
  //     "id": "espn-cric-info",
  //     "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
      
  //     }
  // ]
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 
  constructor(props){
    super(props);
    // console.log('I am constructor from news component')
    this.state={
      // articles:this.articles,
      articles:[],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    
  }
  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a32ae6d28740f788d6bfe807988623&page=${this.state.page}&pageSize=${this.props.pageSize}`
  this.setState({loading:true})
  let data=await fetch(url);
  this.props.setProgress(30);
  let parsedData=await data.json()
  this.props.setProgress(70);
  // console.log(parsedData);
  this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false,})
  this.props.setProgress(100);
  }
  async componentDidMount(){
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a32ae6d28740f788d6bfe807988623&page=1&pageSize=${this.props.pageSize}`
  // this.setState({loading:true})
  // let data=await fetch(url);
  // let parsedData=await data.json()
  // // console.log(parsedData);
  // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  this.updateNews()
  }
  handlePrevClick=async ()=>{
    // console.log("previous")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a32ae6d28740f788d6bfe807988623&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData=await data.json()
    // // console.log(parsedData);
    
  
    //   this.setState({
    //     page:this.state.page-1,
    //     articles:parsedData.articles,
    //     loading:false
    //   })
    this.setState({page:this.state.page-1})
    this.updateNews()
    
  }
   handleNextClick= async ()=>{
  //   console.log("next")
  //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a32ae6d28740f788d6bfe807988623&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //   this.setState({loading:true})
  // let data=await fetch(url);
  // let parsedData=await data.json()
  // // console.log(parsedData);
  

  //   this.setState({
  //     page:this.state.page+1,
  //     articles:parsedData.articles,
  //     loading:false
  //   })
  
  // }
  this.setState({page:this.state.page+1})
  this.updateNews()
  }
  fetchMoreData =  async () => {  
    this.setState({page:this.state.page+1}) 
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0a32ae6d28740f788d6bfe807988623&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json()
    // console.log(parsedData);
    this.setState(
      {
        articles:this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
        }) 
   
   
    };

  render() {
    return (
      <>
          <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                <div className='container'>
          <div className='row'>
          { this.state.articles.map((element)=>{
           return <div className='col-md-3' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
              
              
          </div>
          </div>
          </InfiniteScroll>
          
          
      </>
    )
  }
}

export default News