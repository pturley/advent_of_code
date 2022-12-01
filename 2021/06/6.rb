class Six
  def initialize()
    file = File.open("input6.txt")
    @initial_set = file.readlines.map(&:chomp).first.split(',').map(&:to_i)
  end

  def replicate(starting_set, generations)
    final_set = starting_set.dup
    generations.times do |n|
      num_to_add = 0
      final_set.map! do |num|
        if num == 0
          num_to_add += 1
          num = 7
        end
        updated_num = num - 1
      end
      num_to_add.times { final_set << 8 }
    end
    final_set
  end

  def part1()
    replicate(@initial_set, 80).length
  end

  def part2()
    replicate(@initial_set, 256).length
  end
end

six = Six.new

puts "Part 1: #{six.part1()}"
puts "Part 2: #{six.part2()}"
