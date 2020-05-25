class ApiFeatures {
  constructor( model , reqQuery ){
    this.model = model ,
    this.reqQuery = reqQuery
  }

  // 2 ) Sorting
  sorting(){
    if(this.reqQuery.query.sort){
      // + 1 filter ?
      const allSorts = this.reqQuery.sort.split(',').join(' ')
      return query = this.reqQuery( allSorts )
    }
    else{ // default sort implemented
      return query = this.reqQuery.sort( '-createdAt' )
    }
  }

  // 3 ) Field Limiting
  fieldLimiting(){
    if(this.reqQuery.fields){
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } 
    else {
      query = query.select('-__v')
    }
  }

  // 4 ) Pagination
  async pagination(){
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 1
    const skip = ( page - 1 ) * limit
  
    query = query.skip(skip).limit(limit)
  
    if(this.reqQuery.page){
      const numTours = await this.model.countDocuments();
      if( skip >= numTours ) throw new Error( 'Not more tours available')
    }
  }
}


module.exports = ApiFeatures;