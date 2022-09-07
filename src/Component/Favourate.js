import React from 'react';
class Favourite extends React.Component
{
    constructor()
    {
        super();
        this.state={
            currgen:'All genera',
            allgenera:[],
            currmovie:[],
            currsearch:'',
            limit:5,
            currpage:1,
        }
    }
    handleChanger=(gen)=>
    {
        this.filtermovie(gen);
        this.state.currgen!=gen && this.setState({currgen:gen});
    }
    filtermovie(i)
    {
        const genreid = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759:"Action & Adventure", 10765:"Sci-Fi & Fantasy"};
        let tempfilter=[];
        let temp=JSON.parse(localStorage.getItem("movies")||"[]");
        if(i!="All genera")
        {
            temp.map((obj)=>{
                if(genreid[obj.genre_ids[0]]==i)
                {
                    tempfilter.push(obj);
                }
            });
        }
        else{
            tempfilter=temp;
        }
        console.log(tempfilter);
        this.setState({currmovie:tempfilter});

    }
    componentDidMount()
    {
        let temp=JSON.parse(localStorage.getItem("movies")||"[]");
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759:"Action & Adventure", 10765:"Sci-Fi & Fantasy"};
        let temp1=[];
        temp.forEach((a)=>{
            if(!temp1.includes(genreids[a.genre_ids[0]]))
            {
                temp1.push(genreids[a.genre_ids[0]]);
            }
        }
        );
        temp1.unshift("All genera");
        this.setState({allgenera:temp1,currmovie:temp});
    }
    handleSearch=(e)=>
    {
        console.log(e.target.value);
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759:"Action & Adventure", 10765:"Sci-Fi & Fantasy"};
        let arr=JSON.parse(localStorage.getItem("movies"));
        console.log(arr);
        if(e.target.value==='')
        {
            if(this.state.currgen==="All genera")
            {
                this.setState({currmovie:arr,currsearch:e.target.value});
            }
            else{
                let temp=arr.filter((obj)=>genreids[obj.genre_ids[0]]===this.state.currgen);
                console.log(temp);
                this.setState({currmovie:temp,currsearch:e.target.value});
            }
        }
        else{
            console.log("Enter Into Else where Search Is Not Empty..");
            if(this.state.currgen==="All genera")
            {
                console.log("Enter Into All Genera..");
                let ar=arr.filter((ob)=>((ob.title.toLowerCase()).includes((e.target.value.toLowerCase()))));
                console.log(ar);
                this.setState({currmovie:ar,currsearch:e.target.value});    
            }
            else{
                console.log("Enter Into Genera Not Equal To All Genera..");
                let ar=arr.filter((ob)=>{
                    let title=ob.title.toLowerCase();
                    console.log(title);
                    return(genreids[ob.genre_ids[0]]===this.state.currgen && title.includes(e.target.value));
                });
                console.log(ar);
                this.setState({currsearch:e.target.value,currmovie:ar});
        }
        }
    }
    handlePopularityUp=()=>
    {
        let temp=[...this.state.currmovie];
        temp.sort((obja,objb)=>
        {
            return obja.popularity-objb.popularity;
        });
        this.setState({currmovie:temp});
    }
    handlePopularityDown=()=>
    {
        let temp=[...this.state.currmovie];
        temp.sort((obja,objb)=>
        {
            return objb.popularity-obja.popularity;
        });
        this.setState({currmovie:temp});
    }
    handleRatingUp=()=>
    {
        let temp=[...this.state.currmovie];
        temp.sort((obja,objb)=>
        {
            return obja.popularity-objb.popularity;
        });
        this.setState({currmovie:temp});
    }
    handleRatingDown=()=>
    {
        let temp=[...this.state.currmovie];
        temp.sort((obja,objb)=>
        {
            return objb.popularity-obja.popularity;
        });
        this.setState({currmovie:temp});
    }
    changepage=(page)=>
    {
        console.log("Change Page");
        this.setState({currpage:page});
    }
    handleRow=(e)=>{
        if(this.state.currpage<=Math.ceil(this.state.currmovie.length/JSON.parse(e.target.value)))
        {
            console.log(e);
            console.log(typeof JSON.parse(e.target.value))
            this.setState({limit:JSON.parse(e.target.value)});
        }
        else
        {
            this.setState({limit:JSON.parse(e.target.value),currpage:this.state.currpage-1});
        }
    }
    handleButton=(movid)=>
    {
        let temp=JSON.parse(localStorage.getItem("movies"));
        let tempfilter=temp.filter((obj)=>obj.id!==movid);
        this.setState({currmovie:tempfilter});
        localStorage.setItem("movies",JSON.stringify(tempfilter));
    }
    render()
    {
        const genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western', 10759:"Action & Adventure", 10765:"Sci-Fi & Fantasy"};
        let page=Math.ceil(this.state.currmovie.length/this.state.limit);
        let pagearr=[];
        let filtermov=this.state.currmovie;
        for(let i=1;i<=page;i++)
        {
             pagearr.push(i);
        }
        if(this.state.currpage%2===0)
        {
            let si=(this.state.currpage-1)*this.state.limit;
            let ei=si+this.state.limit;
            console.log(si);
            console.log(ei);
            filtermov=filtermov.slice(si,ei);            
        }
        else
        {
            let si=(this.state.currpage-1)*this.state.limit;
            let ei=si+this.state.limit;
            console.log(si);
            console.log(ei);
            filtermov=filtermov.slice(si,ei);
        }
        return(
            <div>
                <div className='main1'>
                    <div className='row'>
                        <div className='col-xs-12 col-md-3'>
                            <ul class="list-group fav-gen">
                                {

                                    this.state.allgenera.map((i)=>(this.state.currgen==i?<li class="list-group-item" style={{background:'blue',fontWeight:'bold',color:'white'}}>{i}</li>:<li class="list-group-item " onClick={()=>this.handleChanger(i)} style={{background:'white',fontWeight:'bold',color:'blue'}}>{i}</li>))
                  
                                }
                            </ul>
                        </div>
                        <div className='col fav-mov'>
                            <div className='row'>
                                <input type='text' className='input-group-text col me-2' placeholder='Search' onChange={this.handleSearch}/>
                                <input type='number' className='input-group-text col'value={this.state.limit} placeholder='Row Count' onChange={this.handleRow}/>
                            </div>
                            <div className='row pt-4 main'>
                                <div className='col'>
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genera</th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.handlePopularityUp}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.handlePopularityDown}></i></th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.handleRatingUp}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.handleRatingDown}></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filtermov.map((movobj)=>{
                                                    return(
                                                        <tr>
                                                            <td><img src={`https://image.tmdb.org/t/p/original${movobj.backdrop_path}`} alt={movobj.title} style={{"width":"10rem"}}/> {movobj.title}</td>
                                                            <td>{genreids[movobj.genre_ids[0]]}
                                                                </td>
                                                            <td>{movobj.popularity}</td>
                                                            <td>{movobj.vote_average}</td>
                                                            <td><button type="button" class="btn btn-danger" onClick={()=>this.handleButton(movobj.id)}>Delete </button>
                                                            </td>
                                                        </tr>
                                                    );        
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                {
                                                    pagearr.map((p)=><li class="page-item" onClick={()=>this.changepage(p)}><a class="page-link">{p}</a></li>)
                                                }
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Favourite;