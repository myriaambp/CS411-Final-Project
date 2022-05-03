from django.shortcuts import render
# from models import Movie

# Create your views here.
def front(request):
    context = { }
    return render(request, "index.html", context)

def search(request):
    if 'q' in request.GET:
        q = request.GET['q']
        # movie = Movie.getMovieData(q)
        return render(request, 'index.html', {'movie': movie, 'query': q})
    else:
        message = 'You submitted an empty form.'

def imdbapi():
    # settings.configure()
    sys_path.append('project/settings.py')    
    environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_project.settings')
    setup()
    response = requests.get("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/endgame")    
    if response.status_code == 200:
        jsonobj = HttpResponse(json.dumps(response.json(), sort_keys=True, indent=4))
        return jsonobj
    else:
        response_body = {
            "name": "Nagato",
            "about" :"Hello! I'm a full stack developer that loves python and javascript"
        } 
        return response_body

print(imdbapi())
