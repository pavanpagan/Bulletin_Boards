
import Configuration from '../Configuration/Configuration';
import axios from 'axios';
class api {
  constructor() 
  {
    this.config = new Configuration();
  }

  async retrieveItems() {
    let response=await axios.get(this.config.URL+'/getContents');
    return response.data;
  }


  async detailsView(id) {
    let response=await axios.get(this.config.URL+'/getDetailsView/'+id);
    return response.data[0];
  }
  
  async createComment(data) {
    let response=await axios.post(this.config.URL+'/createComment',{data});
    return response.data;
  }

  async createBoard(data)
  {
    let response=await axios({
      method: 'post',
      url: this.config.URL+'/saveBoard',
      data: data,
       config:{ headers: {'Content-Type': 'multipart/form-data' }}
      })
      return response.data;
  }
}
export default api;