import React from 'react';
import axios from 'axios';
class MovieList extends React.Component
{
    constructor()
    {
        super();
        let o=JSON.parse(localStorage.getItem("movies")||"[]");
        let arr=[];
        for(let i=0;i<o.length;i++)
        {
            arr[i]=o[i].id;
        }
        console.log(arr);
        this.state={
            pageState:[1],
            visibleButton:'',
            currPage:1,
            movies:[],
            fav:[...arr]
        }
    }
    async componentDidMount()
    {
        const m=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=9210b76bcce551446ae39aa599696acf&page=${this.state.currPage}`);
        console.log(m);
        const a=m.data;
        this.setState({movies:a.results});
    }
    changemovie= async()=>
    {
        const m=await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=9210b76bcce551446ae39aa599696acf&page=${this.state.currPage}`);
        const a=m.data;
        this.setState({movies:a.results});
    }
    handleClickNext=()=>
    {
        if(this.state.currPage===this.state.pageState[this.state.pageState.length-1])
        {
            let temp=[...this.state.pageState];
            temp.push(this.state.pageState.length+1);
            this.setState({currPage:this.state.currPage+1,pageState:temp},this.changemovie);
        }
        else{
            this.setState({currPage:this.state.currPage+1},this.changemovie);
        }
    }
    handleClickPrev=()=>
    {
        if(this.state.currPage===1)
        {
            this.changemovie();
        }
        else
        this.setState({currPage:this.state.currPage-1},this.changemovie);
    }
    handleClick(i)
    {
        this.setState({currPage:i},this.changemovie);
    }
    handleFav=(m)=>
    {
        let olddata=JSON.parse(localStorage.getItem("movies")||"[]");
        let temp=[];
        if(this.state.fav.includes(m.id))
        {
            console.log(m.id);
            temp =this.state.fav.filter((t)=>t!=m.id);
            olddata=olddata.filter((old)=>old.id!=m.id);
        }
        else{
            olddata.push(m);
            temp=[...this.state.fav];
            temp.push(m.id);
        }
        localStorage.setItem("movies",JSON.stringify(olddata));
        this.setState({fav:temp});
    }
    render()
    {
        return(
        <div>
            <center style={{"marginTop":"50px"}}><h1>Treading</h1></center>
            <div className='movielists'>
                {this.state.movies.map((movobj)=>
                    {
                        return(
                            <div className="card movielist-banner"  onMouseEnter={()=>this.setState({visibleButton:movobj.id})} onMouseLeave={()=>this.setState({visibleButton:''})}>
                            <img src={`https://image.tmdb.org/t/p/original${movobj.backdrop_path}`} className="card-img-top moviebanner-img" alt={movobj.title}/>
                                <div className="card-body movie-info">
                                    <h2 className="card-title col-sm-12"><strong>{movobj.title}</strong></h2>
                                    {
                                        this.state.visibleButton==movobj.id && <a className="btn btn-primary button-pos" onClick={()=>this.handleFav(movobj)}>Add to fav..</a>
                                    }
                                </div>
                        </div>
                        );       
                    }
                    )}
            </div>
            <div className='mt-5 pag-nav'>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" onClick={this.handleClickPrev}><a class="page-link">Previous</a></li>
                        {
                            this.state.pageState.map(
                                (i)=><li class="page-item" onClick={()=>{
                                    return(
                                    this.handleClick(i)
                                    )
                                }
                            }><a class="page-link">{i}</a></li>   
                            )
                        }
                        <li class="page-item" onClick={this.handleClickNext}><a class="page-link">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        );
    }
}
export default MovieList;