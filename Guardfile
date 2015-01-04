guard :sass, input: 'sass', output: 'public/css'
guard :coffeescript, input: 'coffee', output: "public/js", bare: true
guard :livereload do
  watch %r{views/.+.(erb|haml|slim|md|markdown)}
  watch %r{public/css/.+.css}
  watch %r{public/js/.+.js}
end

guard :concat, type: "css", files: %w(helper fontawesome main main_sass roboto), input_dir: "public/css", output: "public/css/all", all_on_start: true

# all_on_start doesn't work
