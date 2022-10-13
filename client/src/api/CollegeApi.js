import instance from "./instance"

const CollegeApi = {
  createCollege: ({college_information, college, dean, university }) => {
    const config = {
      method: 'POST',
      url: '/college',
      params: {
        college_information, 
        college,
        dean,
        university
      }
    }
    return instance.request(config);
  }
}

export default CollegeApi;
