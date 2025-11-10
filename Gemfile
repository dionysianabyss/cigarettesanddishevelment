source "https://rubygems.org"

gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-feed"
end

# Ruby 3+ requires Webrick for `jekyll serve`
gem "webrick", "~> 1.8"

# Optional: file watching improvements on Windows
platforms :mingw, :mswin, :x64_mingw do
  gem "wdm", ">= 0.1.1", require: false
end

