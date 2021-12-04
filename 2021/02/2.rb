class Two
  def initialize()
    file = File.open("input2.txt")
    @commands = file.readlines.map(&:chomp).map(&:split)
  end

  def part1()
    x = 0
    depth = 0

    @commands.each do |command|
      case command[0]
      when "forward"
        x += command[1].to_i
      when "up"
        depth -= command[1].to_i
      else "down"
        depth += command[1].to_i
      end
    end
    x * depth
  end

  def part2()
    x = 0
    aim = 0
    depth = 0

    @commands.each do |command|
      case command[0]
      when "forward"
        x += command[1].to_i
        depth += command[1].to_i * aim
      when "up"
        aim -= command[1].to_i
      else "down"
        aim += command[1].to_i
      end
    end
    x * depth
  end
end

two = Two.new

puts "Part 1: #{two.part1()}"
puts "Part 2: #{two.part2()}"

