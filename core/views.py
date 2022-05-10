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

