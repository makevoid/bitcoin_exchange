module RomUtils
  def new_id(collection)
    id = collection.project([:id]).to_a.map{ |a| a.id  }.max || -1
    id + 1
  end
end