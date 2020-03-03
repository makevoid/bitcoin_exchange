desc "run"
task :run do
  sh "bundle exec rackup -p 3000 -o 0.0.0.0"
end

desc "migrate the database (create tables)"
task :migrate do
  sh "bundle exec ruby lib/tasks/migrate.rb"
end

task default: :run
