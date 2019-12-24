# Catalogue-management-system

Users will be able to create a product. A product has parameters like Brand, Category
and Specifications.
Products can be viewed on a listing page with filters of Brand and Category.

Further explanations and assumptions:

1. Categories have a tree structure - similar to that of Amazon / Flipkart.
2. Each product can have multiple specifications. Specification params - Key, Value &
Unit. Eg. Key - Length, Value: 30 , Unit - cm can be a specification for a scale.
3. Category breadcrumb should be displayed on the product page.
4. Product, Brand and Category names must be unique.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to install the following packages for backend:

```
asgiref==3.2.3
Django==3.0.1
django-jsonfield==1.4.0
djangorestframework==3.11.0
pkg-resources==0.0.0
pytz==2019.3
six==1.13.0
sqlparse==0.3.0
```

### Installing

Clone the repository

```
git clone https://github.com/sachins0023/Catalogue-management-system.git
```

Setting up your virtual environment:

```
python3 -m venv .env
```

Activating Virtual  Environment

```
source .env/bin/activate
```

Once the repository is cloned and virtual environment set up, go to the directory where the requirements.txt(Catalogue-management-system/backend/) is and type the following code in your terminal:

```
pip install requirements.txt
```

Then to run the server, go to the directory 'Catalogue-management-system/backend/cms/' and type the following code in terminal:

```
python3 manage.py runserver
```

Your server is set up with all the APIs active.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
