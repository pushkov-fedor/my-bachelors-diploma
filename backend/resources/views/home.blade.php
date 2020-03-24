@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row px-5">
        <div class="col-3 p-xl-5">
            <img src="https://s3.amazonaws.com/freecodecamp/curriculum-diagram-full.jpg" alt="freeCodeCampLogo"
                class="rounded-circle w-100">
        </div>
        <div class="col-9 pt-5">
            <h1>freeCodeCamp</h1>
            <div class="d-flex">
                <div class="pr-5">
                    <strong>153</strong> posts
                </div>
                <div class="pr-5">
                    <strong>23k</strong> followers
                </div>
                <div class="pr-5">
                    <strong>212</strong> following
                </div>
            </div>
            <div class="pt-4 font-weight-bold">freeCodeCamp.org</div>
            <div class="">We're a global community of millions of people learning to code together. We're an open source, donor-supported, 501(c)(3) nonprofit.</div>
            <div class=""><a href="www.freecodecamp.org">www.freecodecamp.org</a></div>
        </div>
    </div>
    <div class="row pt-4">
        <div class="col-4">
            <img src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
            class="w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-4">
            <img src="https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
            class="w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-4">
            <img src="https://images.pexels.com/photos/2737393/pexels-photo-2737393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
            class="w-100 h-100" style="object-fit: cover;" alt="">
        </div>
    </div>
</div>
@endsection
