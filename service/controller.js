const GithubService = require('./service');

class GithubController {
    getRepositories(req, res, next) {
    const {body} = req;
    const serviceFilters = something(body); // Приводим фильтры к нужному виду
    // Какая-то бизнес логика
    GithubService.requestRepos(serviceFilters)
        .then(data => {
          res.send(data);
        })
        .catch(error => {
            next(error);
        });
    }        
}

module.exports = {
    controller: GithubController,
};
