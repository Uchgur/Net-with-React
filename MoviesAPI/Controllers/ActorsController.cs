using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/actors")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly string containerName = "actors";

        public ActorsController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService)
        {
            _context = context;
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get()
        {
            var actors = await _context.Actors.ToListAsync();
            return _mapper.Map<List<ActorDTO>>(actors);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            return _mapper.Map<ActorDTO>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ActorCreationDTO actorCreationDTO)
        {
            var actor = _mapper.Map<Actor>(actorCreationDTO);

            if (actorCreationDTO.Picture != null)
            {
                actor.Picture = await _fileStorageService.SaveFile(containerName, actorCreationDTO.Picture);
            }

            _context.Add(actor);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDTO actorCreationDTO)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{Id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            _context.Remove(actor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
